import csv
import io
from datetime import date, datetime, timedelta
from decimal import Decimal, InvalidOperation
from django.db.models import Sum, Q, Count
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Vendor, Category, PaymentMethod, Expense
from .serializers import (
    VendorSerializer, CategorySerializer, PaymentMethodSerializer,
    ExpenseSerializer, MarkPaidSerializer, SummarySerializer
)


class VendorViewSet(viewsets.ModelViewSet):
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Vendor.objects.filter(owner=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(owner=self.request.user)


class PaymentMethodViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PaymentMethod.objects.filter(owner=self.request.user)


class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        queryset = Expense.objects.filter(owner=self.request.user)
        
        # Filter by date range
        from_date = self.request.query_params.get('from')
        to_date = self.request.query_params.get('to')
        if from_date:
            queryset = queryset.filter(date__gte=from_date)
        if to_date:
            queryset = queryset.filter(date__lte=to_date)
        
        # Filter by vendor
        vendor_id = self.request.query_params.get('vendor_id')
        if vendor_id:
            queryset = queryset.filter(vendor_id=vendor_id)
        
        # Filter by category
        category_id = self.request.query_params.get('category_id')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        # Filter by payment method
        method_id = self.request.query_params.get('method_id')
        if method_id:
            queryset = queryset.filter(payment_method_id=method_id)
        
        # Filter by paid status
        paid = self.request.query_params.get('paid')
        if paid == 'true':
            queryset = queryset.filter(paid_date__isnull=False)
        elif paid == 'false':
            queryset = queryset.filter(paid_date__isnull=True)
        
        return queryset

    @action(detail=True, methods=['post'])
    def mark_paid(self, request, pk=None):
        expense = self.get_object()
        serializer = MarkPaidSerializer(data=request.data)
        
        if serializer.is_valid():
            paid_date = serializer.validated_data.get('paid_date', date.today())
            reference = serializer.validated_data.get('reference', '')
            
            expense.paid_date = paid_date
            if reference and hasattr(expense, 'payment_reference'):
                expense.payment_reference = reference
            expense.save()
            
            return Response({
                'message': 'Expense marked as paid',
                'paid_date': paid_date,
                'reference': reference
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def import_csv(self, request):
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        csv_file = request.FILES['file']
        if not csv_file.name.endswith('.csv'):
            return Response({'error': 'File must be a CSV'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Decode the file
            csv_data = csv_file.read().decode('utf-8')
            csv_reader = csv.DictReader(io.StringIO(csv_data))
            
            created_count = 0
            skipped_count = 0
            errors = []
            
            for row_num, row in enumerate(csv_reader, start=2):  # Start at 2 because row 1 is headers
                try:
                    # Case-insensitive column mapping
                    row_lower = {k.lower().strip(): v.strip() for k, v in row.items()}
                    
                    # Required fields
                    date_str = row_lower.get('date', '').strip()
                    description = row_lower.get('description', '').strip()
                    amount_str = row_lower.get('amount', '').strip()
                    vendor_name = row_lower.get('vendor', '').strip()
                    category_name = row_lower.get('category', '').strip()
                    
                    if not all([date_str, description, amount_str, vendor_name, category_name]):
                        errors.append(f"Row {row_num}: Missing required fields")
                        skipped_count += 1
                        continue
                    
                    # Parse date
                    try:
                        expense_date = datetime.strptime(date_str, '%Y-%m-%d').date()
                    except ValueError:
                        try:
                            expense_date = datetime.strptime(date_str, '%d/%m/%Y').date()
                        except ValueError:
                            errors.append(f"Row {row_num}: Invalid date format")
                            skipped_count += 1
                            continue
                    
                    # Parse amount
                    try:
                        amount = Decimal(amount_str.replace(',', '.'))
                    except (InvalidOperation, ValueError):
                        errors.append(f"Row {row_num}: Invalid amount")
                        skipped_count += 1
                        continue
                    
                    # Get or create vendor
                    vendor, _ = Vendor.objects.get_or_create(
                        owner=request.user,
                        name=vendor_name,
                        defaults={'name': vendor_name}
                    )
                    
                    # Get or create category
                    category, _ = Category.objects.get_or_create(
                        owner=request.user,
                        name=category_name,
                        defaults={'name': category_name, 'type': 'expense'}
                    )
                    
                    # Get payment method if specified
                    payment_method = None
                    payment_method_name = row_lower.get('payment_method', '').strip()
                    if payment_method_name:
                        payment_method, _ = PaymentMethod.objects.get_or_create(
                            owner=request.user,
                            name=payment_method_name,
                            defaults={'name': payment_method_name}
                        )
                    
                    # Parse paid_date if specified
                    paid_date = None
                    paid_date_str = row_lower.get('paid_date', '').strip()
                    if paid_date_str:
                        try:
                            paid_date = datetime.strptime(paid_date_str, '%Y-%m-%d').date()
                        except ValueError:
                            try:
                                paid_date = datetime.strptime(paid_date_str, '%d/%m/%Y').date()
                            except ValueError:
                                pass  # Just skip paid_date if invalid
                    
                    # Create expense
                    expense = Expense.objects.create(
                        owner=request.user,
                        date=expense_date,
                        vendor=vendor,
                        category=category,
                        description=description,
                        amount=amount,
                        currency='EUR',  # Default currency
                        payment_method=payment_method,
                        paid_date=paid_date,
                        note=row_lower.get('note', '')
                    )
                    
                    created_count += 1
                    
                except Exception as e:
                    errors.append(f"Row {row_num}: {str(e)}")
                    skipped_count += 1
            
            return Response({
                'message': 'CSV import completed',
                'created_count': created_count,
                'skipped_count': skipped_count,
                'errors': errors[:10]  # Limit errors to first 10
            })
            
        except Exception as e:
            return Response({'error': f'Failed to process CSV: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        period = request.query_params.get('period', 'month')
        today = date.today()
        
        if period == 'month':
            from_date = today.replace(day=1)
            to_date = today
        elif period == 'ytd':
            from_date = today.replace(month=1, day=1)
            to_date = today
        else:
            return Response({'error': 'Invalid period. Use "month" or "ytd"'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = Expense.objects.filter(
            owner=request.user,
            date__gte=from_date,
            date__lte=to_date
        )
        
        summary_data = queryset.aggregate(
            count=Count('id'),
            total=Sum('amount') or Decimal('0.00')
        )
        
        return Response({
            'count': summary_data['count'],
            'total': summary_data['total'],
            'from_date': from_date,
            'to_date': to_date,
            'period': period
        })

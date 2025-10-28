from rest_framework import serializers
from .models import Vendor, Category, PaymentMethod, Expense


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'name', 'email', 'phone', 'tax_id', 'note', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'type', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ['id', 'name', 'last4', 'provider', 'note', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)


class ExpenseSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source='vendor.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    payment_method_name = serializers.CharField(source='payment_method.name', read_only=True)
    is_paid = serializers.BooleanField(read_only=True)

    class Meta:
        model = Expense
        fields = [
            'id', 'date', 'vendor', 'vendor_name', 'category', 'category_name',
            'description', 'amount', 'currency', 'payment_method', 'payment_method_name',
            'paid_date', 'receipt', 'note', 'is_paid', 'external_system', 'external_id',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'is_paid', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

    def validate_vendor(self, value):
        if value.owner != self.context['request'].user:
            raise serializers.ValidationError("Vendor must belong to the current user.")
        return value

    def validate_category(self, value):
        if value.owner != self.context['request'].user:
            raise serializers.ValidationError("Category must belong to the current user.")
        return value

    def validate_payment_method(self, value):
        if value and value.owner != self.context['request'].user:
            raise serializers.ValidationError("Payment method must belong to the current user.")
        return value


class MarkPaidSerializer(serializers.Serializer):
    paid_date = serializers.DateField(required=False)
    reference = serializers.CharField(max_length=255, required=False)

    def validate_paid_date(self, value):
        if not value:
            from datetime import date
            return date.today()
        return value


class SummarySerializer(serializers.Serializer):
    count = serializers.IntegerField()
    total = serializers.DecimalField(max_digits=10, decimal_places=2)
    from_date = serializers.DateField()
    to_date = serializers.DateField()
    period = serializers.CharField()
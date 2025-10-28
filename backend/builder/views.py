from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import BrandProfile, ServiceCatalog
from .serializers import (
    UserRegistrationSerializer, BrandProfileSerializer, 
    ServiceCatalogSerializer, DomainCheckSerializer,
    AITextSuggestionSerializer, EmailVerificationSerializer
)
import random


# Auth endpoints
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register new user with business information"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Registration successful',
            'user_id': user.id,
            'require_email_verification': True
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_email(request):
    """Dev stub for email verification"""
    try:
        profile = BrandProfile.objects.get(owner=request.user)
        profile.email_verified = True
        profile.save()
        return Response({
            'message': 'Email verified successfully',
            'verified': True
        })
    except BrandProfile.DoesNotExist:
        return Response({
            'error': 'Brand profile not found'
        }, status=status.HTTP_404_NOT_FOUND)


# Domain check endpoint
@api_view(['GET'])
@permission_classes([AllowAny])
def check_domain(request):
    """Check domain availability (stubbed)"""
    domain_name = request.GET.get('name', '').lower().strip()
    
    if not domain_name:
        return Response({
            'error': 'Domain name is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Stub logic: deny list for common domains
    denied_domains = ['test.com', 'example.com', 'google.com', 'facebook.com', 'twitter.com']
    available = domain_name not in denied_domains
    
    return Response({
        'available': available,
        'domain': domain_name
    })


# Onboarding endpoints
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_onepage_builder(request):
    """Start or get onepage builder profile"""
    try:
        profile = BrandProfile.objects.get(owner=request.user)
        serializer = BrandProfileSerializer(profile)
        return Response(serializer.data)
    except BrandProfile.DoesNotExist:
        return Response({
            'error': 'Brand profile not found. Please complete registration first.'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_description(request):
    """Update brand description"""
    try:
        profile = BrandProfile.objects.get(owner=request.user)
        description = request.data.get('description', '')
        profile.description = description
        profile.save()
        
        serializer = BrandProfileSerializer(profile)
        return Response(serializer.data)
    except BrandProfile.DoesNotExist:
        return Response({
            'error': 'Brand profile not found'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_services(request):
    """Update selected services"""
    try:
        profile = BrandProfile.objects.get(owner=request.user)
        services = request.data.get('services', [])
        
        # Validate max 9 services
        if len(services) > 9:
            return Response({
                'error': 'Maximum of 9 services allowed'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        profile.services = services
        profile.save()
        
        serializer = BrandProfileSerializer(profile)
        return Response(serializer.data)
    except BrandProfile.DoesNotExist:
        return Response({
            'error': 'Brand profile not found'
        }, status=status.HTTP_404_NOT_FOUND)


# Service catalog endpoint
@api_view(['GET'])
@permission_classes([AllowAny])
def get_service_catalog(request):
    """Get services catalog for business type"""
    business_type = request.GET.get('business_type', '').lower()
    
    if not business_type:
        return Response({
            'error': 'business_type parameter is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        catalog = ServiceCatalog.objects.get(business_type=business_type)
        return Response({
            'business_type': business_type,
            'options': catalog.get_services_list()
        })
    except ServiceCatalog.DoesNotExist:
        # Return empty list if no catalog found
        return Response({
            'business_type': business_type,
            'options': []
        })


# Logo upload endpoint
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_logo(request):
    """Upload logo file"""
    try:
        profile = BrandProfile.objects.get(owner=request.user)
        
        if 'logo' not in request.FILES:
            return Response({
                'error': 'No logo file provided'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        profile.logo = request.FILES['logo']
        profile.color_source = 'logo'
        profile.save()
        
        serializer = BrandProfileSerializer(profile)
        return Response(serializer.data)
    except BrandProfile.DoesNotExist:
        return Response({
            'error': 'Brand profile not found'
        }, status=status.HTTP_404_NOT_FOUND)


# Brand update endpoint
class BrandProfileUpdateView(generics.UpdateAPIView):
    """Update brand profile (colors, etc.)"""
    serializer_class = BrandProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return BrandProfile.objects.get(owner=self.request.user)


# AI suggestion endpoint
@api_view(['POST'])
@permission_classes([AllowAny])
def ai_suggest_text(request):
    """AI stub for text suggestions"""
    serializer = AITextSuggestionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    business_name = data['business_name']
    business_type = data['business_type']
    services = data.get('services', [])
    tone = data.get('tone', 'professional')
    char_limit = data.get('char_limit', 200)
    
    # AI stub - generate variations based on tone and business type
    suggestions = {
        'professional': [
            f"{business_name} provides exceptional {business_type} services to help you achieve your goals.",
            f"At {business_name}, we specialize in delivering high-quality {business_type} solutions.",
            f"Trust {business_name} for reliable and professional {business_type} expertise."
        ],
        'friendly': [
            f"Welcome to {business_name}! We're passionate about providing great {business_type} services.",
            f"Hi there! {business_name} is here to make your {business_type} experience amazing.",
            f"At {business_name}, we love helping people with our {business_type} services!"
        ],
        'modern': [
            f"{business_name} - innovative {business_type} solutions for today's challenges.",
            f"Experience next-level {business_type} services with {business_name}.",
            f"Cutting-edge {business_type} expertise from {business_name}."
        ]
    }
    
    # Add services context if provided
    tone_suggestions = suggestions.get(tone, suggestions['professional'])
    if services:
        services_text = ", ".join(services[:3])  # Use first 3 services
        tone_suggestions.extend([
            f"{business_name} offers {services_text} and more to serve your needs.",
            f"Discover our {services_text} services at {business_name}."
        ])
    
    # Pick a random suggestion and trim to char limit
    suggestion = random.choice(tone_suggestions)
    if len(suggestion) > char_limit:
        suggestion = suggestion[:char_limit-3] + "..."
    
    return Response({
        'suggestion': suggestion,
        'business_name': business_name,
        'business_type': business_type,
        'tone': tone
    })


@api_view(['POST'])
@permission_classes([AllowAny])  # For now, since we don't have proper auth yet
def complete_onboarding(request):
    """Complete onboarding with description, services, colors, and logo"""
    try:
        # For now, we'll create or update the first user's profile
        # In production, you'd use request.user
        from django.contrib.auth.models import User
        user = User.objects.first()
        if not user:
            return Response({
                'error': 'No user found. Please register first.'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Get or create brand profile
        profile, created = BrandProfile.objects.get_or_create(
            owner=user,
            defaults={
                'business_name': f"{user.username}'s Business",
                'business_type': 'restaurant'
            }
        )
        
        # Update description
        if 'description' in request.data:
            profile.description = request.data['description']
        
        # Update colors
        if 'primary_color' in request.data:
            profile.primary_color = request.data['primary_color']
        if 'secondary_color' in request.data:
            profile.secondary_color = request.data['secondary_color']
        
        # Update services
        if 'services' in request.data:
            import json
            try:
                services = json.loads(request.data['services'])
                profile.services = services
            except json.JSONDecodeError:
                profile.services = []
        
        # Handle logo upload
        if 'logo' in request.FILES:
            profile.logo = request.FILES['logo']
        
        profile.onboarding_completed = True
        profile.save()
        
        return Response({
            'message': 'Onboarding completed successfully',
            'profile_id': profile.id,
            'redirect_url': '/dashboard'
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': f'Onboarding failed: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

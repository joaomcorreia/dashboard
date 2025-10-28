from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BrandProfile, ServiceCatalog


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration with business info"""
    password = serializers.CharField(write_only=True, min_length=8)
    business_name = serializers.CharField(max_length=200)
    business_type = serializers.CharField(max_length=100)
    preferred_domain = serializers.CharField(max_length=100, required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'business_name', 'business_type', 
                 'preferred_domain', 'address', 'phone')
    
    def create(self, validated_data):
        # Extract business data
        business_data = {
            'business_name': validated_data.pop('business_name'),
            'business_type': validated_data.pop('business_type'),
            'preferred_domain': validated_data.pop('preferred_domain', ''),
            'address': validated_data.pop('address', ''),
            'phone': validated_data.pop('phone', ''),
        }
        
        # Create user
        user = User.objects.create_user(**validated_data)
        
        # Create brand profile
        BrandProfile.objects.create(
            owner=user,
            email=validated_data['email'],
            **business_data
        )
        
        return user


class BrandProfileSerializer(serializers.ModelSerializer):
    """Serializer for BrandProfile model"""
    services = serializers.ListField(
        child=serializers.CharField(),
        allow_empty=True,
        required=False
    )
    
    class Meta:
        model = BrandProfile
        fields = ('id', 'business_name', 'business_type', 'description', 'address', 
                 'phone', 'email', 'preferred_domain', 'domain_available', 'logo',
                 'primary_color', 'secondary_color', 'accent_color', 'background_color',
                 'color_source', 'tone', 'services', 'email_verified', 
                 'onboarding_completed', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')
    
    def validate_services(self, value):
        """Ensure no more than 9 services are selected"""
        if len(value) > 9:
            raise serializers.ValidationError("Maximum of 9 services allowed.")
        return value


class ServiceCatalogSerializer(serializers.ModelSerializer):
    """Serializer for ServiceCatalog model"""
    
    class Meta:
        model = ServiceCatalog
        fields = ('business_type', 'services')


class DomainCheckSerializer(serializers.Serializer):
    """Serializer for domain availability check"""
    name = serializers.CharField(max_length=100)


class AITextSuggestionSerializer(serializers.Serializer):
    """Serializer for AI text suggestions"""
    text = serializers.CharField(required=False, allow_blank=True)
    business_name = serializers.CharField(max_length=200)
    business_type = serializers.CharField(max_length=100)
    services = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        allow_empty=True
    )
    locations = serializers.ListField(
        child=serializers.CharField(), 
        required=False,
        allow_empty=True
    )
    tone = serializers.CharField(max_length=50, default='professional')
    char_limit = serializers.IntegerField(default=200, min_value=50, max_value=500)


class EmailVerificationSerializer(serializers.Serializer):
    """Serializer for email verification (dev stub)"""
    pass  # No fields needed for dev stub
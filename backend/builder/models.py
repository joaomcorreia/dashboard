from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxLengthValidator
import json


class BrandProfile(models.Model):
    """Brand profile for one-page website builder"""
    
    # User relationship
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='brand_profiles')
    
    # Business information
    business_name = models.CharField(max_length=200)
    business_type = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    # Contact information
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField()
    
    # Domain settings
    preferred_domain = models.CharField(max_length=100, blank=True)
    domain_available = models.BooleanField(default=False)
    
    # Brand design
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    primary_color = models.CharField(max_length=7, blank=True)  # Hex color
    secondary_color = models.CharField(max_length=7, blank=True)
    accent_color = models.CharField(max_length=7, blank=True)
    background_color = models.CharField(max_length=7, blank=True)
    color_source = models.CharField(
        max_length=20, 
        choices=[('logo', 'Logo'), ('preset', 'Preset')],
        default='preset'
    )
    
    # Content & services
    tone = models.CharField(max_length=50, default='professional')
    services = models.JSONField(default=list, blank=True)  # List of selected services
    
    # Status tracking  
    email_verified = models.BooleanField(default=False)
    onboarding_completed = models.BooleanField(default=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.business_name} - {self.owner.username}"
    
    def get_services_list(self):
        """Return services as a list"""
        if isinstance(self.services, str):
            try:
                return json.loads(self.services)
            except json.JSONDecodeError:
                return []
        return self.services or []
    
    def set_services_list(self, services_list):
        """Set services from a list"""
        self.services = services_list


class ServiceCatalog(models.Model):
    """Catalog of services available by business type"""
    
    business_type = models.CharField(max_length=100, unique=True)
    services = models.JSONField(default=list)  # List of service strings
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['business_type']
    
    def __str__(self):
        return f"Services for {self.business_type}"
    
    def get_services_list(self):
        """Return services as a list"""
        if isinstance(self.services, str):
            try:
                return json.loads(self.services)
            except json.JSONDecodeError:
                return []
        return self.services or []


# Create some default service catalogs
def create_default_service_catalogs():
    """Helper function to create default service catalogs"""
    default_catalogs = {
        'restaurant': [
            'Online Ordering', 'Menu Display', 'Reservations', 'Catering Services',
            'Food Delivery', 'Event Hosting', 'Takeout', 'Loyalty Program', 'Reviews Display'
        ],
        'retail': [
            'Product Catalog', 'Online Store', 'Inventory Display', 'Customer Reviews',
            'Wishlist', 'Gift Cards', 'Loyalty Program', 'Size Guide', 'Return Policy'
        ],
        'services': [
            'Service Booking', 'Consultation', 'Portfolio Display', 'Testimonials',
            'Contact Form', 'Service Packages', 'FAQ', 'About Us', 'Team Profiles'
        ],
        'healthcare': [
            'Appointment Booking', 'Patient Portal', 'Insurance Information', 'Services Overview',
            'Doctor Profiles', 'Health Tips', 'Contact Information', 'Emergency Info', 'Reviews'
        ],
        'professional': [
            'Portfolio Display', 'Case Studies', 'Service Descriptions', 'Team Profiles',
            'Client Testimonials', 'Contact Form', 'About Company', 'News/Blog', 'Consultation Booking'
        ],
        'education': [
            'Course Catalog', 'Enrollment', 'Student Portal', 'Faculty Profiles',
            'Calendar/Events', 'Resources', 'Testimonials', 'Contact Information', 'FAQ'
        ]
    }
    
    for business_type, services in default_catalogs.items():
        ServiceCatalog.objects.get_or_create(
            business_type=business_type,
            defaults={'services': services}
        )

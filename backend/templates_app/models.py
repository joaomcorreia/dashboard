import uuid
from django.db import models


class TemplateUpload(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('READY', 'Ready'),
        ('FAILED', 'Failed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='templates/uploads/')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    notes = models.TextField(blank=True)
    
    def save(self, *args, **kwargs):
        if not self.title and self.image:
            # Set title from filename if not provided
            self.title = self.image.name.split('/')[-1].split('.')[0]
        if not self.status:
            self.status = 'READY'  # Mark as ready by default after upload
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.title} ({self.status})"
    
    class Meta:
        ordering = ['-created_at']


class ConversionJob(models.Model):
    TARGET_CHOICES = [
        ('DJANGO', 'Django'),
        ('NEXTJS', 'Next.js'),
    ]
    
    STATUS_CHOICES = [
        ('QUEUED', 'Queued'),
        ('RUNNING', 'Running'),
        ('SUCCESS', 'Success'),
        ('ERROR', 'Error'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    upload = models.ForeignKey(TemplateUpload, on_delete=models.CASCADE, related_name='conversion_jobs')
    target = models.CharField(max_length=10, choices=TARGET_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='QUEUED')
    log = models.TextField(blank=True)
    zip_file = models.FileField(upload_to='templates/builds/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.upload.title} → {self.target} ({self.status})"
    
    class Meta:
        ordering = ['-created_at']


class LibraryItem(models.Model):
    TARGET_CHOICES = [
        ('DJANGO', 'Django'),
        ('NEXTJS', 'Next.js'),
    ]
    
    CATEGORY_CHOICES = [
        ('main-website', 'Main Website'),
        ('ecommerce', 'E-commerce'),
        ('blog', 'Blog'),
        ('portfolio', 'Portfolio'),
        ('landing-page', 'Landing Page'),
        ('dashboard', 'Dashboard'),
    ]
    
    SUBCATEGORY_CHOICES = [
        # Main Website subcategories
        ('homepage', 'Homepage'),
        ('about-page', 'About Page'),
        ('contact-page', 'Contact Page'),
        ('services-page', 'Services Page'),
        ('pricing-page', 'Pricing Page'),
        ('domains-page', 'Domains Page'),
        
        # E-commerce subcategories
        ('product-listing', 'Product Listing'),
        ('product-detail', 'Product Detail'),
        ('shopping-cart', 'Shopping Cart'),
        ('checkout', 'Checkout'),
        
        # Blog subcategories
        ('blog-listing', 'Blog Listing'),
        ('blog-post', 'Blog Post'),
        ('author-page', 'Author Page'),
        
        # Portfolio subcategories
        ('gallery', 'Gallery'),
        ('project-detail', 'Project Detail'),
        
        # Landing Page subcategories
        ('lead-capture', 'Lead Capture'),
        ('product-launch', 'Product Launch'),
        ('event-landing', 'Event Landing'),
        
        # Dashboard subcategories
        ('analytics', 'Analytics'),
        ('user-management', 'User Management'),
        ('settings', 'Settings'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    target = models.CharField(max_length=10, choices=TARGET_CHOICES)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='main-website')
    subcategory = models.CharField(max_length=50, choices=SUBCATEGORY_CHOICES, default='homepage')
    description = models.TextField(blank=True, help_text="Description of the template")
    tags = models.CharField(max_length=500, blank=True, help_text="Comma-separated tags")
    zip_file = models.FileField(upload_to='templates/library/')
    preview_image = models.ImageField(upload_to='templates/previews/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def get_file_path(self):
        """Generate organized file path based on category and subcategory"""
        return f"templates/{self.category}/{self.subcategory}/"
    
    def __str__(self):
        return f"{self.category}/{self.subcategory}/{self.name} ({self.target})"
    
    class Meta:
        ordering = ['category', 'subcategory', 'name']
        unique_together = ['category', 'subcategory', 'name', 'target']


class WebsiteTemplate(models.Model):
    """User-created website templates from the Website Templates tab"""
    CATEGORY_CHOICES = [
        ('homepage', 'Homepage'),
        ('about', 'About'),
        ('services', 'Services'),
        ('contact', 'Contact'),
        ('portfolio', 'Portfolio'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='homepage')
    sections = models.JSONField(default=list, help_text="Template sections data")
    preview = models.TextField(blank=True, help_text="Generated preview HTML")
    screenshot = models.ImageField(upload_to='website_templates/screenshots/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} ({self.category})"
    
    class Meta:
        ordering = ['-created_at']

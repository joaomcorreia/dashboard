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
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    target = models.CharField(max_length=10, choices=TARGET_CHOICES)
    zip_file = models.FileField(upload_to='templates/library/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} ({self.target})"
    
    class Meta:
        ordering = ['-created_at']

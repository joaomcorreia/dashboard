from django.db import models
from django.contrib.auth.models import User
from decimal import Decimal


class Vendor(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    tax_id = models.CharField(max_length=50, blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['owner', 'name']),
        ]

    def __str__(self):
        return self.name


class Category(models.Model):
    TYPE_CHOICES = [
        ('expense', 'Expense'),
        ('income', 'Income'),  # for future use
    ]
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='expense')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['owner', 'type']),
        ]
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class PaymentMethod(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    last4 = models.CharField(max_length=4, blank=True, null=True)
    provider = models.CharField(max_length=100, blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['owner', 'name']),
        ]

    def __str__(self):
        return f"{self.name} ****{self.last4}" if self.last4 else self.name


class Expense(models.Model):
    CURRENCY_CHOICES = [
        ('EUR', 'Euro'),
        ('USD', 'US Dollar'),
        ('GBP', 'British Pound'),
    ]
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='EUR')
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True, blank=True)
    paid_date = models.DateField(null=True, blank=True)
    receipt = models.FileField(upload_to='receipts/', null=True, blank=True)
    note = models.TextField(blank=True, null=True)
    
    # For future e-Boekhouden sync
    external_system = models.CharField(max_length=100, null=True, blank=True)
    external_id = models.CharField(max_length=255, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['owner', 'date']),
            models.Index(fields=['owner', 'category']),
            models.Index(fields=['owner', 'vendor']),
        ]
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.date} - {self.description} - €{self.amount}"

    @property
    def is_paid(self):
        return self.paid_date is not None

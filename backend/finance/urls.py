from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VendorViewSet, CategoryViewSet, PaymentMethodViewSet, ExpenseViewSet

router = DefaultRouter()
router.register(r'vendors', VendorViewSet, basename='vendor')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'methods', PaymentMethodViewSet, basename='paymentmethod')
router.register(r'expenses', ExpenseViewSet, basename='expense')

urlpatterns = [
    path('', include(router.urls)),
]
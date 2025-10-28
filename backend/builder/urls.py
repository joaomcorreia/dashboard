from django.urls import path
from . import views

app_name = 'builder'

urlpatterns = [
    # Auth endpoints
    path('auth/register/', views.register_user, name='register'),
    path('auth/verify-email/', views.verify_email, name='verify_email'),
    
    # Domain check
    path('domain/check/', views.check_domain, name='check_domain'),
    
    # Onboarding endpoints
    path('builder/onepage/start/', views.start_onepage_builder, name='start_onepage'),
    path('builder/onepage/description/', views.update_description, name='update_description'),
    path('builder/onepage/services/', views.update_services, name='update_services'),
    
    # Catalog
    path('catalog/services/', views.get_service_catalog, name='service_catalog'),
    
    # Logo & brand
    path('builder/upload-logo/', views.upload_logo, name='upload_logo'),
    path('builder/brand/<int:pk>/', views.BrandProfileUpdateView.as_view(), name='update_brand'),
    
    # AI suggestions
    path('builder/ai/suggest/', views.ai_suggest_text, name='ai_suggest'),
    
    # Complete onboarding
    path('onboard/', views.complete_onboarding, name='complete_onboarding'),
]
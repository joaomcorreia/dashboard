from django.urls import path
from . import views

urlpatterns = [
    # Upload endpoints
    path('uploads/', views.TemplateUploadListCreateView.as_view(), name='upload-list-create'),
    path('uploads/<uuid:pk>/', views.TemplateUploadDetailView.as_view(), name='upload-detail'),
    
    # Conversion job endpoints
    path('jobs/', views.ConversionJobListCreateView.as_view(), name='job-list-create'),
    path('jobs/<uuid:pk>/', views.ConversionJobDetailView.as_view(), name='job-detail'),
    
    # Library endpoints
    path('library/', views.LibraryItemListCreateView.as_view(), name='library-list-create'),
    path('library/<uuid:pk>/download/', views.LibraryItemDownloadView.as_view(), name='library-download'),
    
    # Schema and health endpoints
    path('jobs/schema/', views.JobSchemaView.as_view(), name='job-schema'),
    path('healthz/', views.HealthzView.as_view(), name='healthz'),
]
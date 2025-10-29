from django.contrib import admin
from .models import TemplateUpload, ConversionJob, LibraryItem


@admin.register(TemplateUpload)
class TemplateUploadAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'notes']
    readonly_fields = ['id', 'created_at']


@admin.register(ConversionJob)
class ConversionJobAdmin(admin.ModelAdmin):
    list_display = ['upload', 'target', 'status', 'created_at', 'updated_at']
    list_filter = ['target', 'status', 'created_at']
    search_fields = ['upload__title', 'log']
    readonly_fields = ['id', 'created_at', 'updated_at']


@admin.register(LibraryItem)
class LibraryItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'target', 'created_at']
    list_filter = ['target', 'created_at']
    search_fields = ['name']
    readonly_fields = ['id', 'created_at']

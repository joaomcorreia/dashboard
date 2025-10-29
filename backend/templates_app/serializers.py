from rest_framework import serializers
from uuid import UUID
from .models import TemplateUpload, ConversionJob, LibraryItem


class TemplateUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateUpload
        fields = ['id', 'created_at', 'title', 'image', 'status', 'notes']
        read_only_fields = ['id', 'created_at']


class ConversionJobSerializer(serializers.ModelSerializer):
    upload_title = serializers.CharField(source='upload.title', read_only=True)
    
    class Meta:
        model = ConversionJob
        fields = ['id', 'upload', 'upload_title', 'target', 'status', 'log', 'zip_file', 'created_at', 'updated_at']
        read_only_fields = ['id', 'status', 'log', 'zip_file', 'created_at', 'updated_at']


class LibraryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryItem
        fields = ['id', 'name', 'target', 'zip_file', 'created_at']
        read_only_fields = ['id', 'created_at']


class CreateConversionJobSerializer(serializers.Serializer):
    # Accept BOTH "upload" and "upload_id" for robustness
    upload = serializers.UUIDField(required=False)
    upload_id = serializers.UUIDField(required=False)
    target = serializers.ChoiceField(choices=["DJANGO", "NEXTJS"])

    def validate(self, attrs):
        upload_uuid = attrs.get("upload") or attrs.get("upload_id")
        if not upload_uuid:
            raise serializers.ValidationError({"upload": "This field is required (or use 'upload_id')."})
        attrs["upload_uuid"] = UUID(str(upload_uuid))
        return attrs
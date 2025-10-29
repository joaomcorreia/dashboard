import os
import uuid
import traceback
from django.http import Http404
from django.core.files.base import ContentFile
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny
from django.http import FileResponse
from django.conf import settings

from .models import TemplateUpload, ConversionJob, LibraryItem
from .serializers import TemplateUploadSerializer, ConversionJobSerializer, LibraryItemSerializer, CreateConversionJobSerializer
from .adapters import magicai_converter
from .utils.zipdir import zipdir


class TemplateUploadListCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]
    
    def get(self, request):
        uploads = TemplateUpload.objects.all()
        serializer = TemplateUploadSerializer(uploads, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TemplateUploadSerializer(data=request.data)
        if serializer.is_valid():
            upload = serializer.save(status='READY')
            return Response(TemplateUploadSerializer(upload).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TemplateUploadDetailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk):
        try:
            upload = TemplateUpload.objects.get(pk=pk)
            serializer = TemplateUploadSerializer(upload)
            return Response(serializer.data)
        except TemplateUpload.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, pk):
        try:
            upload = TemplateUpload.objects.get(pk=pk)
            
            # Delete the image file if it exists
            if upload.image and hasattr(upload.image, 'path'):
                try:
                    if os.path.exists(upload.image.path):
                        os.remove(upload.image.path)
                except Exception as e:
                    print(f"Warning: Could not delete image file {upload.image.path}: {e}")
            
            # Delete the upload record
            upload.delete()
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TemplateUpload.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(
                {"error": f"Failed to delete upload: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ConversionJobListCreateView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        jobs = ConversionJob.objects.all()
        serializer = ConversionJobSerializer(jobs, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Log the incoming request for debugging
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f"ConversionJob POST data: {request.data}")
        
        s = CreateConversionJobSerializer(data=request.data)
        if not s.is_valid():
            # Return full error details so the frontend can display them
            logger.error(f"ConversionJob validation errors: {s.errors}")
            return Response({"errors": s.errors}, status=status.HTTP_400_BAD_REQUEST)

        upload_uuid = s.validated_data["upload_uuid"]
        target = s.validated_data["target"]

        try:
            upload = TemplateUpload.objects.get(id=upload_uuid)
        except TemplateUpload.DoesNotExist:
            return Response({"errors": {"upload": ["Upload not found."]}}, status=status.HTTP_404_NOT_FOUND)

        job = ConversionJob.objects.create(upload=upload, target=target, status="QUEUED", log="")
        
        # Run conversion synchronously for now
        try:
            run_conversion(job.id)
        except Exception as e:
            job.status = "ERROR"
            job.log = f"{type(e).__name__}: {e}"
            job.save()

        # Refresh job from database
        job.refresh_from_db()
        
        return Response(ConversionJobSerializer(job).data, status=status.HTTP_201_CREATED)


class ConversionJobDetailView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk):
        try:
            job = ConversionJob.objects.get(pk=pk)
            serializer = ConversionJobSerializer(job)
            return Response(serializer.data)
        except ConversionJob.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LibraryItemListCreateView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        items = LibraryItem.objects.all()
        serializer = LibraryItemSerializer(items, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        job_id = request.data.get('job_id')
        name = request.data.get('name')
        
        if not job_id or not name:
            return Response(
                {'error': 'job_id and name are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            job = ConversionJob.objects.get(pk=job_id)
            if job.status != 'SUCCESS' or not job.zip_file:
                return Response(
                    {'error': 'Job must be successful and have a zip file'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Copy the zip file to library location
            library_item = LibraryItem.objects.create(
                name=name,
                target=job.target
            )
            
            # Copy the file content
            with job.zip_file.open('rb') as source:
                library_item.zip_file.save(
                    f"{library_item.id}.zip",
                    ContentFile(source.read())
                )
            
            serializer = LibraryItemSerializer(library_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except ConversionJob.DoesNotExist:
            return Response(
                {'error': 'Job not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class LibraryItemDownloadView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk):
        try:
            item = LibraryItem.objects.get(pk=pk)
            if not item.zip_file:
                return Response(
                    {'error': 'No file available'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            response = FileResponse(
                item.zip_file.open('rb'),
                as_attachment=True,
                filename=f"{item.name}_{item.target.lower()}_template.zip"
            )
            return response
            
        except LibraryItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class HealthzView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({"ok": True})


class JobSchemaView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({
            "description": "Create a conversion job",
            "required_fields": {
                "upload": "UUID string - ID of the template upload",
                "target": "String - Either 'DJANGO' or 'NEXTJS'"
            },
            "optional_fields": {
                "upload_id": "UUID string - Alternative to 'upload' field"
            },
            "example": {
                "upload": "550e8400-e29b-41d4-a716-446655440000",
                "target": "NEXTJS"
            }
        })


def run_conversion(job_id):
    """
    Run the conversion process for a job with enhanced error handling.
    This is synchronous for now but can be moved to Celery later.
    """
    job = None
    try:
        job = ConversionJob.objects.get(pk=job_id)
        job.status = 'RUNNING'
        job.log = "Starting template conversion..."
        job.save()
        
        print(f"Starting conversion for job {job_id}")
        
        # Get the image path
        image_path = job.upload.image.path
        print(f"Processing image: {image_path}")
        
        # Validate image file exists
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image file not found: {image_path}")
        
        # Run the converter with enhanced error handling
        try:
            output_folder = magicai_converter.convert(image_path, job.target)
            print(f"Conversion completed, output folder: {output_folder}")
        except UnicodeEncodeError as e:
            error_msg = f"Unicode encoding error: Cannot encode character '{e.object[e.start:e.end]}' in {e.encoding} encoding. This is typically caused by emoji or special Unicode characters in the template content."
            print(f"Unicode error: {error_msg}")
            raise IOError(error_msg) from e
        except IOError as e:
            print(f"File system error during conversion: {e}")
            raise
        except Exception as e:
            print(f"Unexpected conversion error: {e}")
            raise IOError(f"Template conversion failed: {e}") from e
        
        # Create zip file
        zip_filename = f"{uuid.uuid4()}.zip"
        zip_path = os.path.join(settings.MEDIA_ROOT, 'templates', 'builds', zip_filename)
        
        # Ensure the builds directory exists
        os.makedirs(os.path.dirname(zip_path), exist_ok=True)
        print(f"Creating zip file: {zip_path}")
        
        # Zip the output folder
        try:
            zipdir(output_folder, zip_path)
            print(f"Successfully created zip file")
        except Exception as e:
            print(f"Error creating zip file: {e}")
            raise IOError(f"Failed to create zip file: {e}") from e
        
        # Save zip file to job
        try:
            with open(zip_path, 'rb') as f:
                job.zip_file.save(zip_filename, ContentFile(f.read()))
            print(f"Zip file saved to job")
        except Exception as e:
            print(f"Error saving zip file to job: {e}")
            raise IOError(f"Failed to save zip file: {e}") from e
        
        job.status = 'SUCCESS'
        job.log = f"Conversion completed successfully!\n\nGenerated {job.target} template pack\nTemplate files: Ready for download\nBased on uploaded image analysis\n\nThe template pack includes responsive components and styling ready for use."
        job.save()
        
        print(f"Job {job_id} completed successfully")
        
        # Clean up temp folder
        try:
            import shutil
            shutil.rmtree(output_folder, ignore_errors=True)
        except Exception as e:
            print(f"Warning: Could not clean up temp folder {output_folder}: {e}")
        
    except ConversionJob.DoesNotExist:
        error_msg = f"Conversion job {job_id} not found"
        print(f"Error: {error_msg}")
        
    except Exception as e:
        error_msg = str(e)
        full_traceback = traceback.format_exc()
        
        print(f"Conversion failed for job {job_id}: {error_msg}")
        print(f"Full traceback:\n{full_traceback}")
        
        if job:
            # Provide user-friendly error messages
            if "Unicode" in error_msg or "encode" in error_msg.lower():
                user_msg = "ENCODING ERROR: The template contains special characters that cannot be processed on Windows. This is typically caused by emoji or special Unicode symbols in the generated content."
            elif "FileNotFoundError" in error_msg or "not found" in error_msg.lower():
                user_msg = "FILE ERROR: The uploaded image file could not be found or accessed."
            elif "Permission" in error_msg or "access" in error_msg.lower():
                user_msg = "PERMISSION ERROR: Unable to write template files. Check file system permissions."
            else:
                user_msg = f"CONVERSION ERROR: {error_msg}"
            
            job.status = 'ERROR'
            job.log = f"{user_msg}\n\nTechnical Details:\n{error_msg}\n\nFull Error Log:\n{full_traceback}"
            job.save()

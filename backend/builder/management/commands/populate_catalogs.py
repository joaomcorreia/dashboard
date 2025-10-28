from django.core.management.base import BaseCommand
from builder.models import create_default_service_catalogs


class Command(BaseCommand):
    help = 'Populate default service catalogs'

    def handle(self, *args, **options):
        create_default_service_catalogs()
        self.stdout.write(
            self.style.SUCCESS('Successfully created default service catalogs')
        )
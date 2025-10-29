import json
import logging

logger = logging.getLogger(__name__)


class SimpleRequestLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith("/api/templates/") and request.method in ("POST", "PUT", "PATCH"):
            try:
                body = request.body.decode("utf-8")
                logger.info("API %s %s body=%s", request.method, request.path, body[:1000])
            except Exception:
                pass
        return self.get_response(request)
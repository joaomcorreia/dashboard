@echo off
echo Testing Django API endpoints...
echo.

echo 1. Testing health endpoint:
curl -X GET http://127.0.0.1:8000/api/templates/healthz/
echo.
echo.

echo 2. Testing schema endpoint:
curl -X GET http://127.0.0.1:8000/api/templates/jobs/schema/
echo.
echo.

echo 3. Testing job creation with valid data (will need a real upload UUID):
echo curl -X POST http://127.0.0.1:8000/api/templates/jobs/ ^
echo   -H "Content-Type: application/json" ^
echo   -d "{\"upload\":\"550e8400-e29b-41d4-a716-446655440000\",\"target\":\"NEXTJS\"}"
echo.

echo 4. Testing job creation with invalid data (should return 400 with error details):
curl -X POST http://127.0.0.1:8000/api/templates/jobs/ ^
  -H "Content-Type: application/json" ^
  -d "{\"target\":\"NEXTJS\"}"
echo.
echo.

echo 5. Testing job creation with invalid target (should return 400):
curl -X POST http://127.0.0.1:8000/api/templates/jobs/ ^
  -H "Content-Type: application/json" ^
  -d "{\"upload\":\"550e8400-e29b-41d4-a716-446655440000\",\"target\":\"INVALID\"}"
echo.
echo.

pause
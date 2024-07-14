from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from provider_portal.views import PatientViewSet, TemperatureViewSet, MedicationViewSet

router = DefaultRouter()

router.register(r'patients', PatientViewSet)
router.register(r'temperatures', TemperatureViewSet)
router.register(r'medications', MedicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("admin/", admin.site.urls),
]

from rest_framework import mixins, viewsets
from .models import Patient, Temperature, Medication
from .serializers import PatientSerializer, TemperatureSerializer, MedicationSerializer

class PatientViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

# Includes operations for list and create
class TemperatureViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
):
    serializer_class = TemperatureSerializer
    queryset = Temperature.objects.all()

    def get_queryset(self):
        queryset = Temperature.objects.all()
        
        patient_id = self.request.query_params.get("patient_id")

        if patient_id is not None:
            queryset = queryset.filter(patient_id=patient_id).order_by("date")

        return queryset

# Includes operations for list, create, and delete
class MedicationViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = MedicationSerializer
    queryset = Medication.objects.all()

    def get_queryset(self):
        queryset = Medication.objects.all()
        
        patient_id = self.request.query_params.get('patient_id')

        if patient_id is not None:
            queryset = queryset.filter(patient_id=patient_id).order_by("-created")

        return queryset

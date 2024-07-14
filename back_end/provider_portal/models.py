from django.db import models

from back_end.models import BaseModel

class Patient(BaseModel):
    name = models.CharField(max_length=256)
    first_name = models.CharField(max_length=256)
    age = models.IntegerField()
    height = models.IntegerField()
    weight = models.IntegerField()
    gender = models.CharField(max_length=256)
    
    def __str__(self):
        return f"{self.first_name} {self.name}"

class Temperature(BaseModel):
    temperature = models.DecimalField(max_digits=4, decimal_places=1)
    date = models.DateField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="body_temperatures")

class Medication(BaseModel):
    name = models.CharField(max_length=256)
    dosage = models.CharField(max_length=10) # Measured in mg
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="medications")

    def __str__(self):
        return f"{self.name} {self.dosage}"

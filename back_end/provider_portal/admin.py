from django.contrib import admin

from .models import Patient, Temperature, Medication

class PatientAdmin(admin.ModelAdmin):
    pass

class TemperatureAdmin(admin.ModelAdmin):
    pass

class MedicationAdmin(admin.ModelAdmin):
    pass

admin.site.register(Patient, PatientAdmin)
admin.site.register(Temperature, TemperatureAdmin)
admin.site.register(Medication, MedicationAdmin)

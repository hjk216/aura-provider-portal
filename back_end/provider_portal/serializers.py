from rest_framework import serializers

from .models import Patient, Temperature, Medication

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ["id", "name", "first_name", "age"]

class TemperatureSerializer(serializers.ModelSerializer):
    def validate(self, attributes):
        patient = attributes.get("patient")
        # NOTE: Temperatures must be created the same day. A bad actor may pass in a different date.
        date = attributes.get("date")

        if Temperature.objects.filter(patient=patient, date=date).exists():
            raise serializers.ValidationError("A temperature for this patient already exists for today")

        return attributes

    class Meta:
        model = Temperature
        fields = ["id", "temperature", "date", "patient"]

class MedicationSerializer(serializers.ModelSerializer):    
    def validate(self, attributes):
        start_date = attributes.get("start_date")
        end_date = attributes.get("end_date")
        
        if start_date and end_date and start_date >= end_date:
            raise serializers.ValidationError("Start date must be before end date")
        
        return attributes
    
    def create(self, validated_data):
        return Medication.objects.create(**validated_data)
    
    class Meta:
        model = Medication
        fields = ["id", "name", "dosage", "start_date", "end_date", "patient"]

import json
import uuid
import os

import django.db.models.deletion
from django.db import migrations, models

from ..models import Patient, Temperature, Medication

# On first migration, upload patient dataset from json file
def upload_patient_data(apps, schema_editor):
    file_path = os.path.join(os.path.dirname(__file__), "../../patient_data/patient_data.json")

    with open(file_path) as f:
        data = json.load(f)

        for item in data:
            medications = item.pop('medications', [])
            body_temperatures = item.pop('body_temperatures', [])
            
            patient = Patient.objects.create(**item)

            for medication in medications:
                Medication.objects.create(**medication, patient=patient)

            for temperature in body_temperatures:
                Temperature.objects.create(**temperature, patient=patient)

class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Patient",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=256)),
                ("first_name", models.CharField(max_length=256)),
                ("age", models.IntegerField()),
                ("height", models.IntegerField()),
                ("weight", models.IntegerField()),
                ("gender", models.CharField(max_length=256)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Medication",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=256)),
                ("dosage", models.CharField(max_length=10)),
                ("start_date", models.DateField(blank=True, null=True)),
                ("end_date", models.DateField(blank=True, null=True)),
                (
                    "patient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="medications",
                        to="provider_portal.patient",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Temperature",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
                ("temperature", models.DecimalField(decimal_places=1, max_digits=4)),
                ("date", models.DateField()),
                (
                    "patient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="body_temperatures",
                        to="provider_portal.patient",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.RunPython(upload_patient_data),
    ]

from django.db import models
from rest_framework import serializers

class Test_model(models.Model):
    model_name = models.CharField(max_length=100, blank=True, default='')
    model_number  = models.FloatField(default=0)

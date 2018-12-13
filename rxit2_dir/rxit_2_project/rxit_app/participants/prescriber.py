from django.db import models
from rest_framework import serializers


class Prescriber(models.Model):
    username = models.CharField(max_length=100, blank=True, default='')
    participant_name = models.CharField(max_length=100, blank=True, default='')
    street = models.CharField(max_length=100, blank=True, default='') 
    city = models.CharField(max_length=100, blank=True, default='')
    province = models.CharField(max_length=100, blank=True, default='')
    practice_type = models.CharField(max_length=100, blank=True, default='')

    def __str__(self):
        return self.username



class PrescriberSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Prescriber
        fields = ('id', 
            'username',
            'participant_name', 
            'street',
            'city',
            'province',
            'practice_type'
            )

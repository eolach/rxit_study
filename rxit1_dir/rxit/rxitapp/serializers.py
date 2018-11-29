from rest_framework import serializers

from .models import CustomUser, Dispenser, Prescriber

class CustomUserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = CustomUser
        fields = ('id', 
            'username', 
            'participant_name', 
            'participant_type',
            'participant_index'
            )

class DispenserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Dispenser
        fields = ('id', 
            'participant_name', 
            'street',
            'city',
            'province'
            )

class PrescriberSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Prescriber
        fields = ('id', 
            'participant_name', 
            'street',
            'city',
            'province'
            )

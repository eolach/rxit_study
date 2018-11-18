from rest_framework import serializers

from .models import CustomUser
# from .participants.dispenser import Dispenser
from .participants.prescriber import Prescriber

class CustomUserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = CustomUser
        fields = ('id', 
            'username', 
            'participant_name', 
            'participant_type',
            'participant_index',
            'password'
            )

""" class DispenserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Dispenser
        fields = ('id', 
            'participant_name', 
            'street',
            'city',
            'province',
            'corporate_type'
            )
 """
""" class PrescriberSerializer(serializers.ModelSerializer):
 
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
 """
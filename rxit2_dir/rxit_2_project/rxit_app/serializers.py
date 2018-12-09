# This includes the serializer for the user only.
# Th serializers for the participants are specified
# along with their models in the participants folder

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


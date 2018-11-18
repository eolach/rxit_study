from django.shortcuts import render

from rest_framework import viewsets, permissions
from .models import CustomUser
# from .participants.dispenser import Dispenser #, DispenserSerializer
from .participants.prescriber import Prescriber, PrescriberSerializer
from . import serializers
from .permissions import ReadOnly

# Create your views here.
def index(request, path=''):
    """
    The home page. This renders the container for the single-page app.
    """
    return render(request, 'index.html')

# Serializers
class CustomUserViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the User model
    """
    queryset = CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer
    permission_classes = (ReadOnly, )

    """ class DispenserViewSet(viewsets.ModelViewSet):
    Provides basic CRUD functions for the Dispenser model

    queryset = Dispenser.objects.all()
    serializer_class = DispenserSerializer
    """
class PrescriberViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Dispenser model
    """
    queryset = Prescriber.objects.all()
    serializer_class = PrescriberSerializer
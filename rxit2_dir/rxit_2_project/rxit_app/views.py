from django.shortcuts import render

from rest_framework import viewsets, permissions
from . import serializers
from .models import CustomUser
from .participants.dispenser import Dispenser, DispenserSerializer
from .participants.prescriber import Prescriber, PrescriberSerializer

import json

# Basic view to open the app

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
    permission_classes = (permissions.IsAdminUser,)
    queryset = CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer


class SpecificUserViewSet(viewsets.ModelViewSet):
    """
    Provides specific CRUD functions for the User model
    when the username is provided
    """
    # permission_classes = (permissions.IsAuthenticated,)


    queryset = CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer
    lookup_field = 'username'


class DispenserViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Test_model model
    """
    permission_classes = (permissions.IsAdminUser,)
    queryset = Dispenser.objects.all()
    serializer_class = DispenserSerializer

class SpecificDispenserViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Test_model model
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Dispenser.objects.all()
    serializer_class = DispenserSerializer

    lookup_field = 'id'



class PrescriberViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Dispenser model
    """
    permission_classes = (permissions.IsAdminUser,)

    queryset = Prescriber.objects.all()
    serializer_class = PrescriberSerializer


class SpecificPrescriberViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Dispenser model
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PrescriberSerializer
    queryset = Prescriber.objects.all()

    lookup_field = 'id'




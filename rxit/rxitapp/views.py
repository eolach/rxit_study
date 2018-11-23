from django.shortcuts import render

from rest_framework import viewsets, permissions
from .models import CustomUser
from .participants.test_model import Test_model, Test_modelSerializer
from .participants.dispenser import Dispenser, DispenserSerializer
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

class SpecificUserViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the User model
    """
    serializer_class = serializers.CustomUserSerializer
    
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = CustomUser.objects.all()
        this_user = self.request.user.usename
        queryset = queryset.filter(username=this_user)
        return queryset


class Test_modelViewSet(viewsets.ModelViewSet):
    
    """
    Provides basic CRUD functions for the Test_model model
    """
    queryset = Test_model.objects.all()
    serializer_class = Test_modelSerializer

class DispenserViewSet(viewsets.ModelViewSet):
    
    """
    Provides basic CRUD functions for the Test_model model
    """
    queryset = Dispenser.objects.all()
    serializer_class = DispenserSerializer



class PrescriberViewSet(viewsets.ModelViewSet):
    """
    Provides basic CRUD functions for the Dispenser model
    """
    queryset = Prescriber.objects.all()
    serializer_class = PrescriberSerializer
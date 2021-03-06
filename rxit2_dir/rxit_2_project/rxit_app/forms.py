# Added following https://wsvincent.com/django-custom-user-model-tutorial/

from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = CustomUser
        fields = UserCreationForm.Meta.fields \
        + ('participant_name', 
        'participant_type',
        'participant_index',)

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = UserChangeForm.Meta.fields 
        # + ('participant_name', 
        # 'participant_type',
        # 'participant_index',)
       
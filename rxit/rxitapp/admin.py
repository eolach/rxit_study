from django.contrib import admin

# Added folloing https://wsvincent.com/django-custom-user-model-tutorial/
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser
from .participants.dispenser import Dispenser
from .participants.prescriber import Prescriber


# Register your models here.

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['username', 'participant_type', 'participant_index']



admin.site.register(CustomUser, CustomUserAdmin)

@admin.register(Dispenser)
class DispenserAdmin(admin.ModelAdmin):
    list_display = ('participant_name', 'province')
    ordering = ['participant_name']

@admin.register(Prescriber)
class PrescriberAdmin(admin.ModelAdmin):
    list_display = ('participant_name', 'province')
    ordering = ['participant_name']
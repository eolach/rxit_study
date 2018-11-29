from django.contrib import admin

# Added folloing https://wsvincent.com/django-custom-user-model-tutorial/
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, Dispenser, Prescriber

# Register your models here.

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser

admin.site.register(CustomUser, CustomUserAdmin)

@admin.register(Dispenser)
class DispenserAdmin(admin.ModelAdmin):
    list_display = ('participant_name', 'province')
    ordering = ['participant_name']

@admin.register(Prescriber)
class PrescriberAdmin(admin.ModelAdmin):
    list_display = ('participant_name', 'province')
    ordering = ['participant_name']
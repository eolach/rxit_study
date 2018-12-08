from django.contrib import admin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, Dispenser, Prescriber
from django.contrib.auth.admin import UserAdmin


# Register your models here.
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser

admin.site.register(CustomUser, CustomUserAdmin)

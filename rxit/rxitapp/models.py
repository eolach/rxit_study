# Added following https://wsvincent.com/django-custom-user-model-tutorial/

from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    """ 
    Adding fields for 
        participant name
        participant type - dispenser, prescriber of client
        and index number of the relevant participant
    """
    participant_name = models.CharField(default='', max_length=200)
    participant_type = models.CharField(default='', max_length=200)
    participant_index = models.IntegerField(default=0)

    def __str__(self):
        return self.username


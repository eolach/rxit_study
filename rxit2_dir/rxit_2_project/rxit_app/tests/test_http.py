from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import APIClient, APITestCase

# All users are set up through the admin panel

USERNAME = 'woodsrx'
PASSWORD = 'opi5mis4'

class AuthenticationTest(APITestCase):
    def setUp(self):
        self.Client = APIClient()

    def user_can_log_in(self):
        response = self.client.post(reverse('log_in'), data= {
            'username': USERNAME,
            'password': PASSWORD
        })
        user = 
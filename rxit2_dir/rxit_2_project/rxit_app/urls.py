from django.urls import path, include
from rest_framework import routers
 
from . import views

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'users', views.CustomUserViewSet)
router.register(r'user', views.SpecificUserViewSet, 'CustomUser')
router.register(r'dispenser', views.SpecificDispenserViewSet, 'Dispenser')
router.register(r'dispensers', views.DispenserViewSet)
router.register(r'prescriber', views.SpecificPrescriberViewSet, 'Prescriber')
router.register(r'prescribers', views.PrescriberViewSet)

urlpatterns = [
    path(r'api/', include(router.urls)),
    path(r'', views.index, name='index')
]
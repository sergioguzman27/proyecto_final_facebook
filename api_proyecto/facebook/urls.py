""" Urls de la aplicacion """

# Django
from django.urls import path, include

# Django rest framework
from rest_framework.routers import DefaultRouter

# Views
from facebook.views import UserViewSet, PostViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'posts', PostViewSet, basename='posts')

urlpatterns = [
  path('', include(router.urls))
]
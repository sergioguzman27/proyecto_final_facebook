""" Permisos para las acciones con usuarios """

# Django rest framework
from rest_framework.permissions import BasePermission

# Modelos
from facebook.models import Post

class IsPostOwner(BasePermission):
    """ Permiso para editar si es el usuario el que lo manda """
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user
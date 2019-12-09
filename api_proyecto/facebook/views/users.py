""" Views para usuarios """

# Django rest framework
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

# Permisos
from rest_framework.permissions import IsAuthenticated
from facebook.permissions import IsAccountOwner

# Modelos
from facebook.models import User

# Serializers
from facebook.serializers import (CreateUserSerializer, UserModelSerializer,
                                  LoginSerializer, UpdateUserSerializer)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    
    
    def get_permissions(self):
        permissions= []
        if (self.action not in ['create', 'login']):
            permissions.append(IsAuthenticated)
        if (self.action in ['update', 'partial_update', 'destroy']):
            permissions.append(IsAccountOwner)
        return [p() for p in permissions]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateUserSerializer
        if self.action in ['update', 'partial_update']:
            return UpdateUserSerializer
        if self.action == 'login':
            return LoginSerializer
        return UserModelSerializer
    
    def create(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            data = request.data,
            context = self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        """ Vista para el login, esta vista obtiene o crea el token """
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserModelSerializer(user).data,
            'access_token': token
        }
        return Response(data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
        """ Vista para logout del usuario, esta vista destruye el token """
        try:
            request.user.auth_token.delete()
        except (ObjectDoesNotExist):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        return Response({"success": "Successfully logged out."},
                    status=status.HTTP_200_OK)

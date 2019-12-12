""" Views para las reacciones """

# Django rest framework
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

# Permisos
from rest_framework.permissions import IsAuthenticated
from facebook.permissions import IsPostOwner

# Modelos
from facebook.models import Reaction

# Serializers
from facebook.serializers import CreateReactionSerializer, ReactionModelSerializer, UpdateReactionSerializer

class ReactionViewSet(viewsets.ModelViewSet):
    
    queryset = Reaction.objects.all()
    
    def get_serializer_class(self):
        if (self.action == 'create'):
            return CreateReactionSerializer
        if (self.action in ['update', 'partial_update']):
            return UpdateReactionSerializer
        return ReactionModelSerializer
    
    def get_permissions(self):
        permissions = [IsAuthenticated]
        if (self.action in ['update', 'partial_update', 'destroy', 'remove_action']):
            permissions.append(IsPostOwner)
        return [p() for p in permissions]
    
    def create(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            data = request.data,
            context = self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        reaction = serializer.save()
        data = ReactionModelSerializer(reaction).data
        return Response(data, status=status.HTTP_201_CREATED)
    
    def update(self, request, pk=None):
        reaction = self.get_object()
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            reaction,
            data=request.data,
            context={'reaction': reaction},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        reaction = serializer.save()
        data = ReactionModelSerializer(reaction).data
        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def remove_action(self, request, *args, **kwargs):
        # data = request.data;
        # print(data)
        try:
            reaction = Reaction.objects.get(user=request.user, post=request.data['post_id'])
        except Reaction.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        reaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        

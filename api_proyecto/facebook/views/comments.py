""" Views para los comentarios """

# Django rest framework
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

# Permisos
from rest_framework.permissions import IsAuthenticated
from facebook.permissions import IsPostOwner

# Modelos
from facebook.models import Comment

# Serializers
from facebook.serializers import (CreateCommentSerializer, CommentModelSerializer,
                                  UpdateCommentSerializer)

class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    
    def get_serializer_class(self):
        if (self.action == 'create'):
            return CreateCommentSerializer
        if (self.action in ['update', 'partial_update']):
            return UpdateCommentSerializer
        return CommentModelSerializer
    
    def get_permissions(self):
        permissions = [IsAuthenticated]
        if (self.action in ['update', 'partial_update', 'destroy']):
            permissions.append(IsPostOwner)
        return [p() for p in permissions]
    
    def create(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            data = request.data,
            context = self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        obj = Comment.objects.get(pk=comment.pk)
        print(comment.id)
        data = CommentModelSerializer(comment).data
        return Response(data, status=status.HTTP_201_CREATED)
    
    def update(self, request, pk=None):
        comment = self.get_object()
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            comment,
            data=request.data,
            context={'comment': comment},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        data = CommentModelSerializer(comment).data
        return Response(data, status=status.HTTP_200_OK)

""" Views para las publicaciones """

# Django rest framework
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

# Permisos
from rest_framework.permissions import IsAuthenticated
from facebook.permissions import IsPostOwner

# Modelos
from facebook.models import Post

# Serializers
from facebook.serializers import CreatePostSerializer, PostModelSerializer

class PostViewSet(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    
    def get_serializer_class(self):
        if (self.action in ['create', 'update', 'partial_update']):
            return CreatePostSerializer
        return PostModelSerializer
    
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
        post = serializer.save()
        data = PostModelSerializer(post).data
        return Response(data, status=status.HTTP_201_CREATED)
    
    def update(self, request, pk=None):
        post = self.get_object()
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(
            post,
            data=request.data,
            context={'post': post},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        post = serializer.save()
        data = PostModelSerializer(post).data
        return Response(data, status=status.HTTP_200_OK)

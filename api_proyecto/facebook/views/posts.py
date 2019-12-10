""" Views para las publicaciones """

# Django rest framework
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

# Permisos
from rest_framework.permissions import IsAuthenticated
from facebook.permissions import IsPostOwner

# Modelos
from facebook.models import Post, Comment, Reaction

from django.db.models import Count, Sum, Avg

# Serializers
from facebook.serializers import (CreatePostSerializer, PostModelSerializer,
                                  CommentModelSerializer, ReactionModelSerializer,
                                  PostCompletSerializer)

class PostViewSet(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    
    def get_serializer_class(self):
        if (self.action in ['create', 'update', 'partial_update']):
            return CreatePostSerializer
        if (self.action in ['all', 'user']):
            return PostCompletSerializer
        return PostModelSerializer
    
    def get_permissions(self):
        permissions = [IsAuthenticated]
        if (self.action in ['update', 'partial_update', 'destroy', 'report']):
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
    
    @action(detail=True, methods=['get'])
    def complete(self, request, *args, **kwargs):
        """ Vista para obtener una publicacion con comentarios y reacciones """
        post = self.get_object()
        # query = Post.objects.all()
        # serializer_class = self.get_serializer_class()
        serializer = PostCompletSerializer(post, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def all(self, request, *args, **kwargs):
        """ Vista para obtener las publicaciones con comentarios y reacciones """
        query = Post.objects.all()
        page = self.paginate_queryset(query)
        serializer_class = self.get_serializer_class()
        if page is not None:
            serializer = serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = serializer_class(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def user(self, request, *args, **kwargs):
        query = Post.objects.filter(user=request.user)
        page = self.paginate_queryset(query)
        serializer_class = self.get_serializer_class()
        if page is not None:
            serializer = serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = serializer_class(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'])
    def summary(self, request, *args, **kwargs):
        """ Vista para obtener el resumen de comentarios y reacciones por publicacion """
        post = self.get_object()
        comments = post.comments_post.count()
        reactions = post.reaction_post.count()
        data = {
            'comments': comments,
            'reactions': reactions
        }
        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def report(self, request, *args, **kwargs):
        """ Vista para obtener los comentarios por publicacion """
        comments = 0
        reactions = 0
        
        posts = Post.objects.filter(user=request.user)
        comments = posts.aggregate(
            total = Count('comments_post'),
        )['total']
        
        reactions = posts.aggregate(
            total = Count('reaction_post'),
        )['total']       
        
        total_posts = posts.count()
        comments = round((comments/total_posts),2)
        reactions = round((reactions/total_posts),2)
        
        data = {
            'comments': comments,
            'reactions': reactions
        }
        
        return Response(data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'])
    def comments(self, request, *args, **kwargs):
        """ Vista para obtener los comentarios por publicacion """
        post = self.get_object()
        query = Comment.objects.filter(comments_post=post)
        page = self.paginate_queryset(query)
        if page is not None:
            serializer = CommentModelSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CommentModelSerializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'])
    def reactions(self, request, *args, **kwargs):
        """ Vista para obtener las reacciones por publicacion """
        post = self.get_object()
        query = Reaction.objects.filter(post=post)
        page = self.paginate_queryset(query)
        if page is not None:
            serializer = ReactionModelSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ReactionModelSerializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

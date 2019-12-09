""" Serializers de las publicaciones """

# Django rest framework
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token

# Django
from django.contrib.auth import authenticate
from django.core.validators import RegexValidator

# Modelos
from facebook.models import Post

# Serializers
from facebook.serializers import UserModelSerializer

class PostModelSerializer(serializers.ModelSerializer):
    
    user = UserModelSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'description',
            'user',
            'created',
            'modified'
        )

class CreatePostSerializer(serializers.ModelSerializer):
    
    title = serializers.CharField(min_length=1, max_length=40)
    description = serializers.CharField(min_length=1, max_length=300)
    
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    
    class Meta:
        model = Post
        fields = ('title', 'description', 'user')
        
    def create(self, data):
        # user = self.context['user']
        post = Post.objects.create(
            title=data['title'],
            description=data['description'],
            user=data['user']
        )
        return post
    
    def update(self, instance, data):
        post = self.context['post']
        post.title = data['title']
        post.description = data['description']
        post.save()
        return post

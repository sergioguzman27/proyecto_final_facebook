""" Serializers de los comentarios """

# Django rest framework
from rest_framework import serializers

# Modelos
from facebook.models import Post, Comment

# Serializers
from facebook.serializers import UserModelSerializer

class CommentModelSerializer(serializers.ModelSerializer):
    
    user = UserModelSerializer(read_only=True)
    
    comments_post = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = ('id', 'comment','user', 'created', 'modified','comments_post')
        
class CreateCommentSerializer(serializers.ModelSerializer):
    
    comment = serializers.CharField(min_length=1, max_length=200)
    
    post_id = serializers.IntegerField(min_value=1)
    
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    
    class Meta:
        model = Comment
        fields = ('comment','post_id', 'user')

    def validate(self, data):
        id_post = data['post_id']
        try:
            post = Post.objects.get(pk=id_post)
        except Post.DoesNotExist:
            raise serializers.ValidationError('The post does not exist')
        self.context['post'] = post
        return data
    
    def create(self, data):
        post = self.context['post']
        comment = Comment.objects.create(
            comment=data['comment'],
            comments_post=post,
            user=data['user']
        )
        return comment

class UpdateCommentSerializer(serializers.ModelSerializer):
    
    comment = serializers.CharField(min_length=1, max_length=200)
    
    class Meta:
        model = Comment
        fields = ('comment',)
        
    def update(self, instance, data):
        comment = self.context['comment']
        comment.comment = data['comment']
        comment.save()
        return comment

""" Serializers de las reacciones """

# Django rest framework
from rest_framework import serializers

# Modelos
from facebook.models import Post, Reaction

# Serializers
from facebook.serializers import UserModelSerializer

class ReactionModelSerializer(serializers.ModelSerializer):
    
    user = UserModelSerializer(read_only=True)
    
    class Meta:
        model = Reaction
        fields = ('id', 'like', 'user', 'created', 'modified')
        
class CreateReactionSerializer(serializers.ModelSerializer):
    
    like = serializers.BooleanField()
    
    post_id = serializers.IntegerField(min_value=1)
    
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    
    class Meta:
        model = Reaction
        fields = ('like','post_id', 'user')
        
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
        try:
            reaction = Reaction.objects.get(user=data['user'], post=post)
            print('lo edita')
            reaction.like = data['like']
            reaction.save()
        except Reaction.DoesNotExist:
            print('lo crea')
            reaction = Reaction.objects.create(
                like=data['like'],
                post=post,
                user=data['user']
            )
        return reaction

class UpdateReactionSerializer(serializers.ModelSerializer):
    
    like = serializers.BooleanField()
    
    class Meta:
        model = Reaction
        fields = ('like',)
        
    def update(self, instance, data):
        reaction = self.context['reaction']
        reaction.like = data['like']
        reaction.save()
        return reaction

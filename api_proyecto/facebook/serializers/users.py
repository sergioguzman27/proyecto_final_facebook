""" Serializers de usurio """

# Django rest framework
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token

# Modelos
from facebook.models import User

# Django
from django.contrib.auth import authenticate
from django.core.validators import RegexValidator

class UserModelSerializer(serializers.ModelSerializer):
    """ Serializer para listar usuarios """
    
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'created'
        )

class CreateUserSerializer(serializers.ModelSerializer):
    """ Serializer para crear usuarios """
    email = serializers.EmailField(
        validators = [
            UniqueValidator(queryset=User.objects.all())
        ]
    )
    
    username = serializers.CharField(
        min_length=4,
        max_length=20,
        validators = [
            UniqueValidator(queryset=User.objects.all())
        ]
    )
    
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message='El numero no tiene el formato requerido'
    )
    
    phone_number = serializers.CharField(
        max_length=17,
        validators=[phone_regex]
    )
    
    password = serializers.CharField(min_length=8, max_length=64)
    first_name = serializers.CharField(min_length=2,max_length=30)
    last_name = serializers.CharField(min_length=2,max_length=30)
    
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'password',
        )
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UpdateUserSerializer(serializers.ModelSerializer):
    """ Serializer para editar la informacion del usuario """
    username = serializers.CharField(
        required=False,
        min_length=4,
        max_length=20,
        validators = [
            UniqueValidator(queryset=User.objects.all())
        ]
    )
    
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message='El numero no tiene el formato requerido'
    )
    
    phone_number = serializers.CharField(
        required=False,
        max_length=17,
        validators=[phone_regex],
    )
    first_name = serializers.CharField(required=False, min_length=2,max_length=30)
    last_name = serializers.CharField(required=False, min_length=2,max_length=30)
    
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'phone_number',
        )

class LoginSerializer(serializers.Serializer):
    """ Serializer para realizar el logeo del usuario """
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, max_length=64)
    
    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Credenciales invalidas')
        self.context['user'] = user
        return data
    
    def create(self, data):
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key

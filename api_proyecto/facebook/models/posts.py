""" Modelos de Publicaciones """

# Django
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

# Modelos
from facebook.models import ModelBase
from facebook.models import User

class Post(ModelBase):
    title = models.CharField(max_length=40)
    description = models.CharField(max_length=300)

    user = models.ForeignKey(
        'facebook.User',
        on_delete=models.CASCADE,
        related_name='user',
        help_text='Usuario creador de la publicacion'
    )
    
    class Meta:
        ordering = ['-created']
        
    def __str__(self):
        return '{} - {}'.format(self.title, self.user)

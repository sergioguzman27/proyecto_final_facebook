""" Modelos de Reacciones """

# Django
from django.db import models

# Modelos
from facebook.models import ModelBase
from facebook.models import User, Post

class Reaction(ModelBase):
    
    like = models.BooleanField(help_text='True significa un like, false un dislike')
    
    user = models.ForeignKey(
        'facebook.User',
        related_name='reaction_user',
        on_delete=models.CASCADE,
        help_text='Usuario creador de la reaccion'
    )
    
    post = models.ForeignKey(
        'facebook.Post',
        related_name='reaction_post',
        on_delete=models.CASCADE,
        help_text='Publicacion a la que pertenece la reaccion'
    )
    
    class Meta:
        ordering = ['created']
        
    def __str__(self):
        return 'reaction - {}'.format(self.user)

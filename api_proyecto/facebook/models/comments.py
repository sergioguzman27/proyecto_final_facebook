""" Modelos de Comentarios """

# Django
from django.db import models

# Modelos
from facebook.models import ModelBase
from facebook.models import User, Post

class Comment(ModelBase):
    
    comment = models.CharField(max_length=200)
    
    user = models.ForeignKey(
        'facebook.User',
        related_name='comment_user',
        on_delete=models.CASCADE,
        help_text='Usuario creador del comentario'
    )
    
    comments_post = models.ForeignKey(
        'facebook.Post',
        related_name='comments_post',
        on_delete=models.CASCADE,
        help_text='Publicacion a la que pertenece el comentario'
    )
    
    class Meta:
        ordering = ['created']
        
    def __str__(self):
        return 'comment - {}'.format(self.user)

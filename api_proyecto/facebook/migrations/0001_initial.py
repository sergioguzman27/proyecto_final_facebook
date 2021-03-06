# Generated by Django 2.2.7 on 2019-12-10 15:04

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion del objeto')),
                ('modified', models.DateTimeField(auto_now=True, help_text='Fecha de modificacion del objeto')),
                ('email', models.EmailField(error_messages={'unique': 'El email debe ser unico'}, max_length=254, unique=True, verbose_name='email address')),
                ('phone_number', models.CharField(blank=True, max_length=17, validators=[django.core.validators.RegexValidator(message='El numero no tiene el formato requerido', regex='\\+?1?\\d{9,15}$')])),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'ordering': ['pk'],
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion del objeto')),
                ('modified', models.DateTimeField(auto_now=True, help_text='Fecha de modificacion del objeto')),
                ('title', models.CharField(max_length=40)),
                ('description', models.CharField(max_length=300)),
                ('user', models.ForeignKey(help_text='Usuario creador de la publicacion', on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='Reaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion del objeto')),
                ('modified', models.DateTimeField(auto_now=True, help_text='Fecha de modificacion del objeto')),
                ('like', models.BooleanField(help_text='True significa un like, false un dislike')),
                ('reaction_post', models.ForeignKey(help_text='Publicacion a la que pertenece la reaccion', on_delete=django.db.models.deletion.CASCADE, related_name='reaction_post', to='facebook.Post')),
                ('user', models.ForeignKey(help_text='Usuario creador de la reaccion', on_delete=django.db.models.deletion.CASCADE, related_name='reaction_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['created'],
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion del objeto')),
                ('modified', models.DateTimeField(auto_now=True, help_text='Fecha de modificacion del objeto')),
                ('comment', models.CharField(max_length=200)),
                ('comments_post', models.ForeignKey(help_text='Publicacion a la que pertenece el comentario', on_delete=django.db.models.deletion.CASCADE, related_name='comments_post', to='facebook.Post')),
                ('user', models.ForeignKey(help_text='Usuario creador del comentario', on_delete=django.db.models.deletion.CASCADE, related_name='comment_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['created'],
            },
        ),
    ]

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Modelos
from facebook.models import User

class CustomUserAdmin(UserAdmin):
    list_display = ('username','email','first_name','last_name','phone_number')
    list_filter = ('created','modified')
    
admin.site.register(User, CustomUserAdmin)

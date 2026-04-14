from django.contrib import admin
from .models import Component, ComponentType, Status

admin.site.register(Component)
admin.site.register(ComponentType)
admin.site.register(Status)

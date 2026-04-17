from rest_framework import serializers
from .models import ComponentType, Status, Component


class ComponentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponentType
        fields = ['id', 'name']


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['id', 'name']


class ComponentSerializer(serializers.ModelSerializer):
    type_name = serializers.CharField(source='type.name', read_only=True)
    status_name = serializers.CharField(source='status.name', read_only=True)

    class Meta:
        model = Component
        fields = ['id', 'name', 'description', 'type', 'type_name',
                    'status', 'status_name', 'source', 'origin_country',
                    'image_url', 'created_at']
        read_only_fields = ['id']

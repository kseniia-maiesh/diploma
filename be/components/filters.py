import django_filters
from .models import Component, ComponentType, Status


class ComponentFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains', label='Name contains')
    description = django_filters.CharFilter(lookup_expr='icontains', label='Description contains')
    type = django_filters.ModelChoiceFilter(queryset=ComponentType.objects.all(), label='Component Type')
    status = django_filters.ModelChoiceFilter(queryset=Status.objects.all(), label='Status')
    source = django_filters.CharFilter(lookup_expr='icontains', label='Source contains')
    origin_country = django_filters.CharFilter(lookup_expr='icontains', label='Origin Country contains')

    class Meta:
        model = Component
        fields = ['name', 'description', 'type', 'status', 'source', 'origin_country']


class ComponentTypeFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains', label='Name contains')

    class Meta:
        model = ComponentType
        fields = ['name']


class StatusFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains', label='Name contains')

    class Meta:
        model = Status
        fields = ['name']

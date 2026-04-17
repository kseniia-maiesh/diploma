from rest_framework import viewsets, status
from django.db.models import Count
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import ComponentType, Status, Component
from .serializers import ComponentTypeSerializer, StatusSerializer, ComponentSerializer
from .filters import ComponentFilter, ComponentTypeFilter, StatusFilter

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100


class ComponentTypeViewSet(viewsets.ModelViewSet):
    queryset = ComponentType.objects.all()
    serializer_class = ComponentTypeSerializer
    filterset_class = ComponentTypeFilter
    search_fields = ['name']
    ordering_fields = ['id', 'name']
    ordering = ['name']
    pagination_class = None


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    filterset_class = StatusFilter
    search_fields = ['name']
    ordering_fields = ['id', 'name']
    ordering = ['name']
    pagination_class = None


class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all().select_related('type', 'status')
    serializer_class = ComponentSerializer
    filterset_class = ComponentFilter
    pagination_class = StandardResultsSetPagination
    search_fields = ['name', 'description', 'source']
    ordering_fields = ['id', 'name', 'type', 'status']
    ordering = ['name']

    @action(detail=False, methods=['get'])
    def by_type(self, request):
        type_id = request.query_params.get('type_id')
        if type_id:
            components = self.queryset.filter(type_id=type_id)
            serializer = self.get_serializer(components, many=True)
            return Response(serializer.data)
        return Response({'error': 'type_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def by_status(self, request):
        status_id = request.query_params.get('status_id')
        if status_id:
            components = self.queryset.filter(status_id=status_id)
            serializer = self.get_serializer(components, many=True)
            return Response(serializer.data)
        return Response({'error': 'status_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def stats_by_country(self, request):
        data = (
            Component.objects
            .values('origin_country')
            .annotate(count=Count('id'))
            .order_by('-count')
        )
        return Response(data)

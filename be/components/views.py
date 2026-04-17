import csv
import datetime

from django.http import HttpResponse
from django.db.models import Count

from rest_framework import viewsets
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
        return Response({'error': 'type_id parameter is required'}, status=400)

    @action(detail=False, methods=['get'])
    def by_status(self, request):
        status_id = request.query_params.get('status_id')
        if status_id:
            components = self.queryset.filter(status_id=status_id)
            serializer = self.get_serializer(components, many=True)
            return Response(serializer.data)
        return Response({'error': 'status_id parameter is required'}, status=400)

    @action(detail=False, methods=['get'])
    def stats_by_country(self, request):
        data = (
            Component.objects
            .exclude(origin_country__isnull=True)
            .exclude(origin_country__exact='')
            .values('origin_country')
            .annotate(count=Count('id'))
            .order_by('-count')
        )
        return Response(data)

    @action(detail=False, methods=['get'])
    def export_all(self, request):
        format_type = request.query_params.get('format', 'csv')

        components = Component.objects.all()

        if format_type == 'json':
            serializer = self.get_serializer(components, many=True)
            return Response(serializer.data)

        filename = f'components_{datetime.datetime.now().strftime("%Y%m%d_%H%M")}.csv'

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.writer(response)

        writer.writerow([
            'id',
            'name',
            'description',
            'type',
            'status',
            'origin_country',
            'source',
            'image_url',
            'created_at'
        ])

        for c in components:
            writer.writerow([
                c.id,
                c.name,
                c.description,
                c.type.name,
                c.status.name,
                c.origin_country,
                c.source,
                c.image_url,
                c.created_at.strftime('%Y-%m-%d %H:%M:%S') if c.created_at else ''
            ])

        return response

    @action(detail=True, methods=['get'])
    def export_one(self, request, pk=None):
        component = self.get_object()
        format_type = request.query_params.get('format', 'csv')

        if format_type == 'json':
            serializer = self.get_serializer(component)
            return Response(serializer.data)

        filename = f'component_{component.id}.csv'

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        writer = csv.writer(response)

        writer.writerow([
            'id',
            'name',
            'description',
            'type',
            'status',
            'origin_country',
            'source',
            'image_url',
            'created_at'
        ])

        writer.writerow([
            component.id,
            component.name,
            component.description,
            component.type.name,
            component.status.name,
            component.origin_country,
            component.source,
            component.image_url,
            component.created_at.strftime('%Y-%m-%d %H:%M:%S') if component.created_at else ''
        ])

        return response

    @action(detail=False, methods=['post'])
    def import_csv(self, request):
        file = request.FILES.get('file')

        if not file:
            return Response({'error': 'No file provided'}, status=400)

        try:
            decoded = file.read().decode('utf-8').splitlines()
            reader = csv.DictReader(decoded)

            created = 0
            errors = []

            for i, row in enumerate(reader):
                try:
                    Component.objects.create(
                        name=row.get('name', ''),
                        description=row.get('description', ''),
                        type_id=int(row.get('type')) if row.get('type') else None,
                        status_id=int(row.get('status')) if row.get('status') else None,
                        origin_country=row.get('origin_country', ''),
                        source=row.get('source', ''),
                        image_url=row.get('image_url', ''),
                    )
                    created += 1

                except Exception as e:
                    errors.append({
                        'row': i + 1,
                        'error': str(e)
                    })

            return Response({
                'created': created,
                'errors': errors
            })

        except Exception as e:
            return Response({'error': str(e)}, status=500)
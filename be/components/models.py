from django.db import models


class ComponentType(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'component_types'

class Status(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'statuses'

class Component(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    type = models.ForeignKey(ComponentType, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    source = models.CharField(max_length=255)
    origin_country = models.CharField(max_length=100, blank=True, null=True)
    image_url = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'components'

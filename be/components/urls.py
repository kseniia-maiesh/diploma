from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComponentTypeViewSet, StatusViewSet, ComponentViewSet
from .auth_views import login, register, logout, user_info

router = DefaultRouter()
router.register(r'component-types', ComponentTypeViewSet, basename='componenttype')
router.register(r'statuses', StatusViewSet, basename='status')
router.register(r'components', ComponentViewSet, basename='component')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login, name='login'),
    path('auth/register/', register, name='register'),
    path('auth/logout/', logout, name='logout'),
    path('auth/user/', user_info, name='user_info'),
]

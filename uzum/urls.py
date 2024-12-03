from django.urls import path
from . import views  
from .views import *
from rest_framework_simplejwt.views import TokenRefreshSlidingView


urlpatterns = [
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),
    path('logout/', views.logout_user, name='logout_user'),

    path('api/products/', ProductListCreateView.as_view(), name='get_data'),
    path('api/add_cart/', views.add_to_cart, name='add_to_cart'),
    path('api/get_cart_items/', views.get_cart_items, name='get_cart_items'),
    path('api/delete_cart/<int:item_id>/', views.delete_from_cart, name='delete_from_cart'),
    path('api/like/', views.like_item, name='like_item'),
    path('api/unlike/', views.unlike_item, name='unlike_item'),
    path('api/get_liked/', views.get_liked_items, name='get_liked_items'),
    path('api/delete_liked/<int:item_id>/', views.delete_from_liked, name='delete_from_liked'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('api/get-data/', views.get_data, name='uzum'),
    path('api/add-item/', views.add_to_cart, name='add-item'),
    path('api/get_cart_items/', views.get_cart_items, name='get_cart_items'),
    path('api/delete_from_cart/<int:item_id>/', views.delete_from_cart, name='delete_from_cart'),
    path('api/like_item/', views.like_item, name='like_item'),
    path('api/get_liked_items/', views.get_liked_items, name='get_liked_items'),
    path('api/delete_from_liked/<int:item_id>/', views.delete_from_liked, name='delete_from_liked'),
    path('api/unlike_item/', views.unlike_item, name='unlike_item'),
]
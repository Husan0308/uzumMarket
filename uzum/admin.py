from django.contrib import admin
from django.contrib import admin
from .models import *

admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(LikedItem)
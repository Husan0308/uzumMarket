from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    discount = models.DecimalField(max_digits=10, decimal_places=3)
    monthly = models.DecimalField(max_digits=10, decimal_places=3)
    cost = models.DecimalField(max_digits=10, decimal_places=3)
    image = models.ImageField(upload_to='img/', null=True, blank=True)

    def __str__(self):
        return self.title

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}'s cart items {self.product.title}"

class LikedItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}'s liked item: {self.product.title}"



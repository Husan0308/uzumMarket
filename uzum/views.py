from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import Product, CartItem, LikedItem
from rest_framework import status
from .serializers import ProductSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from rest_framework import generics



class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Register User
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = RefreshToken.for_user(user)
    return Response({
        "status": "success",
        "message": "User registered successfully!",
        "tokens": {
            "refresh": str(token),
            "access": str(token.access_token),
        },
    }, status=status.HTTP_201_CREATED)

# Login User
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    token = RefreshToken.for_user(user)
    return Response({
        "status": "success",
        "username": user.username,
        "tokens": {
            "refresh": str(token),
            "access": str(token.access_token),
        },
    }, status=status.HTTP_200_OK)

# Logout User
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    refresh_token = request.data.get('refresh')
    if not refresh_token:
        return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"status": "success", "message": "Logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)
    except Exception:
        return Response({"error": "Invalid token or logout failed."}, status=status.HTTP_400_BAD_REQUEST)

# Add Item to Cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    item_id = request.data.get('id')

    if not item_id:
        return Response({'status': 'error', 'message': 'Item ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    product = Product.objects.filter(id=item_id).first()
    if not product:
        return Response({'status': 'error', 'message': 'Item not found.'}, status=status.HTTP_404_NOT_FOUND)

    CartItem.objects.get_or_create(user=user, product=product)
    return Response({'status': 'success', 'message': f'Item with ID {item_id} added to cart!', 'item': product.title})

# Get Cart Items
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart_items(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user).select_related('product')
    products = [item.product for item in cart_items if item.product]
    data = ProductSerializer(products, many=True).data
    return Response({'status': 'success', 'data': data}, status=status.HTTP_200_OK)

# Remove Item from Cart
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_from_cart(request, item_id):
    user = request.user
    cart_item = CartItem.objects.filter(user=user, product__id=item_id).first()
    if cart_item:
        cart_item.delete()
        return Response({'status': 'success', 'message': f'Item with ID {item_id} removed from cart!'}, status=status.HTTP_204_NO_CONTENT)
    return Response({'status': 'error', 'message': 'Item not found in cart.'}, status=status.HTTP_404_NOT_FOUND)

# Like Item
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_item(request):
    user = request.user
    item_id = request.data.get('id')

    if not item_id:
        return Response({'status': 'error', 'message': 'Item ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    product = Product.objects.filter(id=item_id).first()
    if not product:
        return Response({'status': 'error', 'message': 'Item not found.'}, status=status.HTTP_404_NOT_FOUND)

    liked_item, created = LikedItem.objects.get_or_create(user=user, product=product)
    if not created:
        return Response({'status': 'error', 'message': 'Item is already liked.'}, status=status.HTTP_409_CONFLICT)

    return Response({'status': 'success', 'message': f'Item with ID {item_id} was liked!', 'item': product.title})

# Unlike Item
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlike_item(request):
    user = request.user
    item_id = request.data.get('id')

    if not item_id:
        return Response({'status': 'error', 'message': 'Item ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    liked_item = LikedItem.objects.filter(user=user, product__id=item_id).first()
    if liked_item:
        liked_item.delete()
        return Response({'status': 'success', 'message': f'Item with ID {item_id} was unliked!'})
    return Response({'status': 'error', 'message': 'Item not found in liked items.'}, status=status.HTTP_404_NOT_FOUND)

# Get Liked Items
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_liked_items(request):
    user = request.user
    liked_items = LikedItem.objects.filter(user=user).select_related('product')
    products = [item.product for item in liked_items]
    data = ProductSerializer(products, many=True).data
    return Response({'status': 'success', 'data': data}, status=status.HTTP_200_OK)

# Remove Item from Liked
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_from_liked(request, item_id):
    user = request.user
    liked_item = LikedItem.objects.filter(user=user, product__id=item_id).first()
    if liked_item:
        liked_item.delete()
        return Response({'status': 'success', 'message': f'Item with ID {item_id} removed from liked items!'}, status=status.HTTP_204_NO_CONTENT)
    return Response({'status': 'error', 'message': 'Item not found in liked items.'}, status=status.HTTP_404_NOT_FOUND)

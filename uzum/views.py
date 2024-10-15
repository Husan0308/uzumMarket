from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

Product = [
        {
            "id": 1,
            "type": "Uy-ro`zg`orlari",
            "title": "Sovg`a to`plami oshxona anjomlari Kukmara Granit Ultra 19",
            "discount": 290.000,
            "monthly": 21.666,
            "cost": 260.000,
            "img": "assets/img/qozonlar.jpg",
        },
        {
            "id": 2,
            "type": "Uy-ro`zg`orlari",
            "title": "Sovg`a to`plami oshxona anjomlari Kukmara Granit Ultra 19",
            "discount": 1600.000,
            "monthly": 121.416,
            "cost": 1457.000,
            "img": "assets/img/3-qozon.jpg",
        },
        {
            "id": 3,
            "type": "Uy-ro`zg`orlari",
            "title": "Universal gupkalar",
            "discount": 25.000,
            "monthly": 5.000,
            "cost": 15.000,
            "img": "assets/img/gubka.jpg",
        },
        {
            "id": 4,
            "type": "Uy-ro`zg`orlari",
            "title": "Oshxona uchun sprey ABC yog`larga qarshi, 750 ml",
            "discount": 42.000,
            "monthly": 4.083,
            "cost": 35.000,
            "img": "assets/img/Oshxona.jpg",
        },
        {
            "id": 5,
            "type": "Uy-ro`zg`orlari",
            "title": "Pol tozalash uchun vosita ABC, 900 ml",
            "discount": 36.000,
            "monthly": 3.383,
            "cost": 29.000,
            "img": "assets/img/shanpon.jpg",
        },
        {
            "id": 6,
            "type": "Go`zallik va parvarish",
            "title": "Nam salfetkalar Sunlight (72) эко",
            "discount": 9.000,
            "monthly": 933,
            "cost": 8.000,
            "img": "assets/img/nam salfetka.jpg",
        },
        {
            "id": 7,
            "type": "Aksessuarlar",
            "title": "Uzuk Stainless Steel Cartie Xuping, toshli",
            "discount": 55.000,
            "monthly": 1.050,
            "cost": 9.000,
            "img": "assets/img/uzuk.jpg",
        },
        {
            "id": 8,
            "type": "Poyabzallar",
            "title": "Havo o`tkazuvchan o`g`il bolalar uchun sport krossovkalar",
            "discount": 169.000,
            "monthly": 11.550,
            "cost": 99.000,
            "img": "assets/img/erkaklar poyabzali.jpg",
        },
        {
            "id": 9,
            "type": "Kiyim",
            "title": "Erkaklar futbolkasi",
            "discount": 100.000,
            "monthly": 3.383,
            "cost": 29.000,
            "img": "assets/img/erkaklar futbolkasi.jpg",
        },
        {
            "id": 10,
            "type": "Maishiy texnika",
            "title": "Kir yuvish mashinasi JPE Invertor BLDC, 6-8 kg, taymer, Child-Lock",
            "discount": 6.460000,
            "monthly": 314.883,
            "cost": 2.699000,
            "img": "assets/img/kir yuvish mashinasi.jpg",
        },
        {
            "id": 11,
            "type": "Maishiy texnika",
            "title": "Changyutgich Magna VCH2314YB, 1200 Vt quvvat, 2 litr hajmi",
            "discount": 1.500000,
            "monthly": 85.550,
            "cost": 699.000,
            "img": "assets/img/pilsos.jpg",
        },
        {
            "id": 12,
            "type": "Elektronika",
            "title": "Smartfon Samsung Galaxy A35 5G, 8/128, 8/256, 6,6\" 50 Mp, 120 Gts, AMOLED, IP67, 2SIM",
            "discount": 5.499000,
            "monthly": 454.883,
            "cost": 3.899000,
            "img": "assets/img/Smartfon Samsung Galaxy A35.jpg",
        },
        {
            "id": 13,
            "type": "Elektronika",
            "title": "Aqlli soat, Smart Watch AAA Lux iOS, Android uchun, simsiz zaryadlash bilan",
            "discount": 700.000,
            "monthly": 22.050,
            "cost": 189.000,
            "img": "assets/img/watch.jpg",
        },
        {
            "id": 14,
            "type": "Elektronika",
            "title": "Simsiz qulodchinlar Air max AAA, Bluetooth, USB-C fleshka",
            "discount": 990.000,
            "monthly": 22.050,
            "cost": 189.000,
            "img": "assets/img/Naushnik.jpg",
       },
    ]

    # return Response({
    #     'status': 'success',
    #     'data': data
    # })

cart_items = []
like_items = []

@api_view(['GET'])
def get_data(request):
    return Response({
        'status': 'success',
        'data': Product
    })

@api_view(['POST'])
def add_to_cart(request):
    if request.method == 'POST':
        item_id = request.data.get('id')
        # Find the product by id
        product = next((item for item in Product if item['id'] == item_id), None)
        
        if product:
            cart_items.append(product)  # Add product to cart
            return Response({
                'status': 'success',
                'message': f'Item with id {item_id} added to cart!',
                'item': product
            })
        else:
            return Response({
                'status': 'error',
                'message': 'Item not found.'
            }, status=404)

@api_view(['GET'])
def get_cart_items(request):
    return Response({
        'status': 'success',
        'data': cart_items
    })

@api_view(['DELETE'])
def delete_from_cart(request, item_id):
    global cart_items
    item_to_delete = next((item for item in cart_items if item['id'] == item_id), None)

    if item_to_delete:
        cart_items.remove(item_to_delete)  # Remove the item from cart
        return Response({
            'status': 'success',
            'message': f'Item with id {item_id} deleted from cart!'
        }, status=204)
    else:
        return Response({
            'status': 'error',
            'message': 'Item not found in the cart.'
        }, status=404)
    
@api_view(['POST'])
def like_item(request):
    if request.method == 'POST':
        item_like_id = request.data.get('id')
        
        # Find the item by id
        item = next((item for item in Product if item['id'] == item_like_id), None)

        if item:
            # Check if the item is already liked
            if item in like_items:
                like_items.remove(item)

                return Response({
                    'status': 'success',
                    'message': f'Item with id {item_like_id} was unliked!',
                    'item': item
                })
            else:
                like_items.append(item)

                return Response({
                    'status': 'success',
                    'message': f'Item with id {item_like_id} was liked!'
                })
        else:
            return Response({
                'status': 'error',
                'message': 'Item not found.'
            }, status=404)  # Return a 404 status if item is not found


@api_view(['GET'])
def get_liked_items(request):
    print('liked:', like_items)
    return Response({
        'status': 'success',
        'data': like_items
    })

@api_view(['DELETE'])
def delete_from_liked(request, item_id):
    global like_items
    item_to_delete = next((item for item in like_items if item['id'] == item_id), None)

    if item_to_delete:
        like_items.remove(item_to_delete)  # Remove the item from cart
        return Response({
            'status': 'success',
            'message': f'Item with id {item_id} deleted from cart!'
        }, status=204)
    else:
        return Response({
            'status': 'error',
            'message': 'Item not found in the cart.'
        }, status=404)
    


@api_view(['POST'])
def unlike_item(request):
    """
    Remove an item from the liked list.
    """
    item_like_id = request.data.get('id')

    # Find the item in the Product list by id
    item = next((item for item in Product if item['id'] == item_like_id), None)

    if item:
        # Check if the item is in the liked items list
        if item in like_items:
            # If found, remove it (unlike)
            like_items.remove(item)
            return Response({
                'status': 'success',
                'message': f'Item with id {item_like_id} was unliked!',
                'item': item
            })
        else:
            return Response({
                'status': 'error',
                'message': f'Item with id {item_like_id} was not found in the liked items.'
            }, status=404)
    else:
        return Response({
            'status': 'error',
            'message': 'Item not found in the product list.'
        }, status=404)

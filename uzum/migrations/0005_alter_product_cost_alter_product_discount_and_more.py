# Generated by Django 5.1.1 on 2024-11-01 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uzum', '0004_remove_product_img_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='cost',
            field=models.DecimalField(decimal_places=6, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='discount',
            field=models.DecimalField(decimal_places=6, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='monthly',
            field=models.DecimalField(decimal_places=6, max_digits=10),
        ),
    ]

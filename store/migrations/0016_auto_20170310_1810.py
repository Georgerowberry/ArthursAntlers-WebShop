# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-11 02:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_gallery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='image',
            field=models.ImageField(blank=True, upload_to='img/'),
        ),
    ]
# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-05 23:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_auto_20170305_1500'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, upload_to='\\img'),
        ),
    ]

from __future__ import unicode_literals
from django.core.urlresolvers import reverse
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(max_length=250, default="description")
    price = models.DecimalField(max_digits=6, decimal_places=2)
    available = models.BooleanField(default=True)
    product_id = models.PositiveIntegerField(default=1)
    image = models.ImageField(upload_to='img/', blank=True)

    def __str__(self):
        return self.name



class Info(models.Model):
    about_tom = models.TextField(max_length=1000)

    def __str__(self):
        return self.about_tom
    class Meta:
        verbose_name_plural = 'Info'



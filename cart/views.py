from django.shortcuts import render
from easycart import BaseCart

# We assume here that you've already defined your item model
# in a separate app named "catalog".
from store.models import Product


class Cart(BaseCart):

    def get_queryset(self, pks):
        return Product.objects.filter(pk__in=pks)

# Create your views here.

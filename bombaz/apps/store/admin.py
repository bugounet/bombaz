from django.contrib import admin

# Register your models here.
from .models import Ownership, BuyableItem, Cart

admin.register(Ownership)
admin.register(BuyableItem)
admin.register(Cart)
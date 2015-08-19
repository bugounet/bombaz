from django.contrib import admin

# Register player model
from .models import Player
admin.site.register(Player)


# Register relationships
from .models import FriendshipRelation
admin.site.register(FriendshipRelation)

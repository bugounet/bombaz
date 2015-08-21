from django.db import models
from store.models import BuyableItem


# Skins: Players can buy skins for their robot. It's always better to have
# a skin that fits to your playing style.
# A skin does not change the behavior of the Character in-game.
class Skin(BuyableItem):
    name = models.CharField(max_length=70)
    data_ref = models.CharField(max_length=50)


# Maps : a player can buy a map to practice or to play
# with his own friends
class Map(BuyableItem):
    name = models.CharField(max_length=70)
    player_spots_number = models.IntegerField()
    data_ref = models.CharField(max_length=50)

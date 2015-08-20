from django.db import models

# Create your models here.

class BuyableItem(models.Model):
    """ Define a meta class for objects you can buy : it will contain a price
    a previous price in case of discount and other buying related fields.
    """
    class Meta:
        abstract = True

    price = models.IntegerField()
    # if set : this will appear as previous price on front view.
    previous_price = models.IntegerField(null=True)


class Cart(models.Model):
    """ A Cart can be bought or emptied: if it is bought, it will be set to
    inactive and there will be a new cart generated.
    """
    class Meta:
        app_label = "store"

    player = models.ForeignKey('players.Player')
    # only one active cart is accepted per user
    status = models.BooleanField()
    # date of cart creation (mainly used for stats)
    creation_date = models.DateField(auto_now_add=True)
    # date of cart validation (used for stats & user history)
    validation_date = models.DateField(null=True)


class OwnershipManager(models.Manager):
    """ Define shortcuts to list maps, skin and other items users can own.
    """
    def all_maps(self):
        return self.filter(map__isnull=False)

    def all_skins(self):
        return self.filter(skin__isnull=False)

    # list only active items
    def active_maps(self):
        return self.filter(end_date__gt=datetime.now(), map__isnull=False)

    def active_skins(self):
        return self.filter(end_date__gt=datetime.now(), skin__isnull=False)

    # shortcut to create an Ownership model (it won't be saved)
    def own(self, player, item):
        o = Ownership(player=player)
        field = CLASS_MAPS[item.__class__.__name__]
        setattr(o, field, item)
        return o

class Ownership(models.Model):
    """ This class is an intermediary class to have more information on player
    ownership establishments.
    """
    player = models.ForeignKey('players.Player', related_name='owned_items')
    # Use the custom manager to enable easy items filering
    objects = OwnershipManager()
    # Foreign keys to all buyable models
    map = models.ForeignKey('gameparts.Map', null=True)
    skin = models.ForeignKey('gameparts.Skin', null=True)
    # Start date of owner ship is used to do stat & to display user ownership
    # duration.
    start_date = models.DateField(auto_now_add=True)
    # There can be an end-date defined in case of renting of limited offers.
    end_date = models.DateField(null=True)

from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4


# Player class is an addition to the django authentication
# User model class.
class Player(models.Model):
    # bind the player model to django users.
    user = models.OneToOneField(User)
    # add bombaz's users fields like score and so on...

    # create a list of moods
    moods = models.ForeignKey('Mood')
    # scores
    scores = models.ForeignKey('Score')
    # shop's articles like skins ans maps
    skins = models.ForeignKey('Skin')
    maps = models.ForeignKey('Map')
    # cross user relations
    Friends = models.ManyToManyField('Player',
                                     through='FriendshipRelation')

# Mood model (players describing their feelings)
class Mood(models.Model):
    text = models.CharField(max_length=200)
    publishing_date = models.DateTimeField()

# score model# Mood model (players describing their feelings)
class Score(models.Model):
    value = models.IntegerField()
    date = models.DateTimeField()

class Skin(models.Model):
    name = models.CharField(max_length=70)
    price = models.IntegerField()
    data_ref = models.CharField(max_length=50)

class Map(models.Model):
    name = models.CharField(max_length=70)
    prince =  models.IntegerField()
    player_spots_number = models.IntegerField()
    data_ref = models.CharField(max_length=50)

class FriendshipRelation(models.Model):
    # relation basic fields
#     from_player = models.ForeignKey(Player)
#     to_player = models.ForeignKey(Player)
#     id = models.UUIDField(primary_key=True,
#                           default=uuid4,
#                           editable=False)
    # Relation meta information like establishment date
    # games played together and so on.
    blocked = models.BooleanField(default=False)
    plug_date = models.DateTimeField()
    games_played_together = models.IntegerField(default=0)

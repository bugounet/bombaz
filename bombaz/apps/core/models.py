from django.db import models
from django.contrib.auth.models import User
# from uuid import uuid4


class Skin(models.Model):
    name = models.CharField(max_length=70)
    price = models.IntegerField()
    data_ref = models.CharField(max_length=50)


### SOCIAL

# Mood model (players describing their feelings)
class Mood(models.Model):
    text = models.CharField(max_length=200)
    publishing_date = models.DateTimeField()


### Score @ map go in GAME
# score model# Mood model (players describing their feelings)
class Score(models.Model):
    value = models.IntegerField()
    date = models.DateTimeField()


class Map(models.Model):
    name = models.CharField(max_length=70)
    prince = models.IntegerField()
    player_spots_number = models.IntegerField()
    data_ref = models.CharField(max_length=50)

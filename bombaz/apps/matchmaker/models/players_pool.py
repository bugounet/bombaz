__author__ = 'bugounet'

from django.db import models


class PlayersPool(models.Model):

    # mean time between each player joins the pool
    update_rate = models.FloatField()


from django.db import models
from django.contrib.auth.models import User
# from uuid import uuid4



# Player class is an addition to the django authentication
# User model class.
class Player(models.Model):
    class Meta:
        app_label="players"
    # bind the player model to django users.
    user = models.OneToOneField(User)
    # add bombaz's users fields like score and so on...

    # create a list of moods
    moods = models.ForeignKey('core.Mood')
    # scores
    scores = models.ForeignKey('core.Score')
    # shop's articles like skins ans maps
    skins = models.ForeignKey('core.Skin')
    maps = models.ForeignKey('core.Map')
    # cross user relations
    Friends = models.ManyToManyField('Player',
                                     through='FriendshipRelation')


# Player friendship relation.
class FriendshipRelation(models.Model):
    class Meta:
        app_label="players"
    # Relation meta information like establishment date
    # games played together and so on.
    blocked = models.BooleanField(default=False)
    plug_date = models.DateTimeField()
    games_played_together = models.IntegerField(default=0)

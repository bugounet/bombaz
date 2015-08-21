from django.db import models


# score model : player scores & date.
class Score(models.Model):
    class Meta:
        app_label = "games"
    value = models.IntegerField()
    date = models.DateTimeField()
    player = models.ForeignKey('players.Player', related_name="scores")


# In a near future we would be able to make many game modes. We would need
# some other models for that.
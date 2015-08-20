from django.db import models

# Create your models here.
# Mood model (players describing their feelings)
class Mood(models.Model):
    text = models.CharField(max_length=200)
    publishing_date = models.DateTimeField()

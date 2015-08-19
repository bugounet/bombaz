# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20150819_2128'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FriendshipRelation',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('blocked', models.BooleanField(default=False)),
                ('plug_date', models.DateTimeField()),
                ('games_played_together', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('Friends', models.ManyToManyField(to='players.Player', through='players.FriendshipRelation')),
                ('maps', models.ForeignKey(to='core.Map')),
                ('moods', models.ForeignKey(to='core.Mood')),
                ('scores', models.ForeignKey(to='core.Score')),
                ('skins', models.ForeignKey(to='core.Skin')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

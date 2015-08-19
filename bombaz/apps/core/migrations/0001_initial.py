# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FriendshipRelation',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('blocked', models.BooleanField(default=False)),
                ('plug_date', models.DateTimeField()),
                ('games_played_together', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Map',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=70)),
                ('prince', models.IntegerField()),
                ('player_spots_number', models.IntegerField()),
                ('data_ref', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Mood',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('text', models.CharField(max_length=200)),
                ('publishing_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('Friends', models.ManyToManyField(to='core.Player', through='core.FriendshipRelation')),
                ('maps', models.ForeignKey(to='core.Map')),
                ('moods', models.ForeignKey(to='core.Mood')),
            ],
        ),
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('value', models.IntegerField()),
                ('date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Skin',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=70)),
                ('price', models.IntegerField()),
                ('data_ref', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='player',
            name='scores',
            field=models.ForeignKey(to='core.Score'),
        ),
        migrations.AddField(
            model_name='player',
            name='skins',
            field=models.ForeignKey(to='core.Skin'),
        ),
        migrations.AddField(
            model_name='player',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
        ),
    ]

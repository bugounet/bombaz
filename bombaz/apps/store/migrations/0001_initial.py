# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('players', '0001_initial'),
        ('gameparts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('status', models.BooleanField()),
                ('creation_date', models.DateField(auto_now_add=True)),
                ('validation_date', models.DateField(null=True)),
                ('player', models.ForeignKey(to='players.Player')),
            ],
        ),
        migrations.CreateModel(
            name='Ownership',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('start_date', models.DateField(auto_now_add=True)),
                ('end_date', models.DateField(null=True)),
                ('map', models.ForeignKey(to='gameparts.Map', null=True)),
                ('player', models.ForeignKey(related_name='owned_items', to='players.Player')),
                ('skin', models.ForeignKey(to='gameparts.Skin', null=True)),
            ],
        ),
    ]

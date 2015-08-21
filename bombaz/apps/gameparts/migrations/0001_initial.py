# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Map',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('price', models.IntegerField()),
                ('previous_price', models.IntegerField(null=True)),
                ('name', models.CharField(max_length=70)),
                ('player_spots_number', models.IntegerField()),
                ('data_ref', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Skin',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('price', models.IntegerField()),
                ('previous_price', models.IntegerField(null=True)),
                ('name', models.CharField(max_length=70)),
                ('data_ref', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

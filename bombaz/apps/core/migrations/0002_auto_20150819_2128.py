# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='Friends',
        ),
        migrations.RemoveField(
            model_name='player',
            name='maps',
        ),
        migrations.RemoveField(
            model_name='player',
            name='moods',
        ),
        migrations.RemoveField(
            model_name='player',
            name='scores',
        ),
        migrations.RemoveField(
            model_name='player',
            name='skins',
        ),
        migrations.RemoveField(
            model_name='player',
            name='user',
        ),
        migrations.DeleteModel(
            name='FriendshipRelation',
        ),
        migrations.DeleteModel(
            name='Player',
        ),
    ]

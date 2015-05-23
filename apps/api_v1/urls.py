from django.conf.urls import patterns, include, url

import lobby.views.api.v1_0 as lobby_api_v1
import matchmaker.urls as matchmaker

urlpatterns = patterns(
    '',
    url(r'^1.0/scores/[0-9]+$', lobby_api_v1.scores),
    url(r'^1.0/matchmaker/', include(matchmaker))
)

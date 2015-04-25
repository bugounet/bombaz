from django.conf.urls import patterns, include, url
import lobby.views.api.v1_0 as lobby_api_v1
import lobby.views.website as lobby_view

urlpatterns = patterns('',
    # main website : game showcase logged out/unsubscribed visitors.
    # ex: /
    url(r'^$', lobby_view.index, name="index"),
    url(r'^api/1.0/scores/[0-9]+$', lobby_api_v1.scores),
)


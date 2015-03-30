from django.conf.urls import patterns, include, url
import lobby.views as lobby_views
urlpatterns = patterns('',
    # main website : game showcase logged out/unsubscribed visitors.
    # ex: /
    url(r'^$', lobby_views.index),
)



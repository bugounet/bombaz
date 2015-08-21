from django.conf.urls import patterns, include, url
import api_v1.urls as api_routes
import lobby.views.lobby as lobby_view
import lobby.views.tutorial as tutorial_view

urlpatterns = patterns(
    '',
    # main website : game showcase logged out/un subscribed visitors.
    # ex: /
    url(r'^$', lobby_view.index, name="index"),
    url(r'^templates/tutorial', tutorial_view.tutorial, name="tutorial"),
    url(r'^templates/home$', lobby_view.home, name="home"),
    url(r'^templates/scores$', lobby_view.scores, name="scores"),
    url(r'^templates/store$', lobby_view.store, name="store"),
    url(r'^templates/preferences', lobby_view.preferences, name="preferences"),
    url(r'^api/', include(api_routes, namespace="api_v1")),
)


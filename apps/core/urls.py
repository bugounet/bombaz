from django.conf.urls import patterns, include, url
import core.views.index as core_index_view
urlpatterns = patterns('',
    # main website : game showcase logged out/unsubscribed visitors.
    # ex: /
    url(r'^$', core_index_view.public, name='index'),
)



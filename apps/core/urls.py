from django.conf.urls import patterns, include, url
import core.views.public as core_public_views
urlpatterns = patterns('',
    # main website : game showcase logged out/unsubscribed visitors.
    # ex: /
    url(r'^$', core_public_views.home, name='home'),
    url(r'^features', core_public_views.features, name='features'),
    url(r'^login', core_public_views.login_form, name='login_form'),
    url(r'^subscribe', core_public_views.signup_form, name='signup_form'),
)



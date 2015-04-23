from django.conf.urls import patterns, url
import core.views.public as core_public_views
import core.views.users as core_user_views
urlpatterns = patterns('',
    # main website : game showcase logged out/unsubscribed visitors.
    # ex: /
    url(r'^$', core_public_views.home, name='home'),
    url(r'^features', core_public_views.features, name='features'),
    url(r'^login', core_user_views.login_form_view, name='login_form'),
    url(r'^subscribe', core_user_views.signup_form_view, name='signup_form'),
)



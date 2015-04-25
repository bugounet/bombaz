from django.conf.urls import patterns, url
import core.views.public as core_public_views
import core.views.users as core_user_views
urlpatterns = patterns('',
    # main website : game showcase logged out/unsubscribed visitors.
    url(r'^$', core_public_views.home, name='bombaz:core:home'),
    url(r'^features', core_public_views.features, name='bombaz:core:features'),
    url(r'^login', core_user_views.login_form_view, name='bombaz:core:login'),
    url(r'^subscribe', core_user_views.signup_form_view, name='bombaz:core:signup'),
)

from django.conf.urls import patterns, url
import matchmaker.views as match_maker_views

urlpatterns = patterns(
    'bombazmatchmaker',
    url(r'^join', match_maker_views.join, name='join'),
    url(r'^accept', match_maker_views.accept, name='accept_match'),
    url(r'^deny', match_maker_views.deny, name='deny_match'),
    url(r'^status', match_maker_views.get_pool_status, name='pool_status')
)

from django.conf.urls import patterns, include, url
from django.contrib import admin
import core.urls

urlpatterns = patterns('',
    # core urls
    url(r'^$', include(core.urls)),
    # urls for admin interface.
    # url(r'^admin/', include(admin.site.urls)),
)


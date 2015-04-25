from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

import core.urls
import lobby.urls

urlpatterns = patterns('',
    # core urls
    url(r'', include(core.urls, namespace='bombaz-core')),
    url(r'^lobby/', include(lobby.urls, namespace='bombaz-lobby')),
    # urls for admin interface.
    # url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


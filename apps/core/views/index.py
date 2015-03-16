from django.http import HttpResponse
from django.template import RequestContext, loader

import i18n.strings.website as WEBSITE_STRINGS


def public(request):
    template = loader.get_template('core/index.html')
    context = RequestContext(request, {
        'WEBSITE_STRINGS': WEBSITE_STRINGS,
    })
    return HttpResponse(template.render(context))


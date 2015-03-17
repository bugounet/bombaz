from django.http import HttpResponse
from django.template import RequestContext, loader

import i18n.strings.website as WEBSITE_STRINGS


def home(request):
    template = loader.get_template('core/home.html')
    context = RequestContext(request, {
        'WEBSITE_STRINGS': WEBSITE_STRINGS,
    })
    return HttpResponse(template.render(context))

def features(request):
    template = loader.get_template('core/features.html')
    context = RequestContext(request, {
        'WEBSITE_STRINGS': WEBSITE_STRINGS,
    })
    return HttpResponse(template.render(context))

def login_form(request):
    template = loader.get_template('core/login_form.html')
    context = RequestContext(request, {
        'WEBSITE_STRINGS': WEBSITE_STRINGS,
    })
    return HttpResponse(template.render(context))


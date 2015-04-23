from django.http import HttpResponse
from django.template import RequestContext, loader
from django.views.decorators.http import require_GET

def _(string):
    return string


@require_GET
def home(request):
    template = loader.get_template('core/home.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context))


@require_GET
def features(request):
    template = loader.get_template('core/features.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context))

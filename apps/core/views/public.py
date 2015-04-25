from django.http import HttpResponse
from django.template import RequestContext, loader
from django.views.decorators.http import require_safe

def _(string):
    return string


@require_safe
def home(request):
    template = loader.get_template('core/home.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context))


@require_safe
def features(request):
    template = loader.get_template('core/features.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context))

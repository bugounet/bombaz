from django.http import HttpResponse
from django.template import loader, RequestContext

__author__ = 'bugounet'


def tutorial(request):
    template = loader.get_template('lobby/tutorial.html')
    context = RequestContext(request, {
        'me': request.user,
    })
    return HttpResponse(template.render(context))

from django.http import HttpResponse
from django.template import RequestContext, loader
# from django.contrib.auth import authenticated


def index(request):
    template = loader.get_template('lobby/index.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context))


def home(request):
    template = loader.get_template('lobby/home.html')
    context = RequestContext(request, {
        'me': request.user,
    })
    return HttpResponse(template.render(context))


def scores(request):
    template = loader.get_template('lobby/scores.html')
    context = RequestContext(request, {
        'me': request.user,
    })
    return HttpResponse(template.render(context))


def store(request):
    template = loader.get_template('lobby/store.html')
    context = RequestContext(request, {
        'me': request.user,
    })
    return HttpResponse(template.render(context))


def preferences(request):
    template = loader.get_template('lobby/preferences.html')
    context = RequestContext(request, {
        'me': request.user,
    })
    return HttpResponse(template.render(context))

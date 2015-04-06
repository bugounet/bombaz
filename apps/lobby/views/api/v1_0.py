from django.http import HttpResponse
from django.template import RequestContext, loader
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from json import dumps

def scores(request):
    response = {'list': [1,2,3,4,5,6,6]}
    return HttpResponse(dumps(response))


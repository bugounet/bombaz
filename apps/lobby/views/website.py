from django.http import HttpResponse
from django.template import RequestContext, loader
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.db import IntegrityError

def index(request):
    template = loader.get_template('lobby/index.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context))



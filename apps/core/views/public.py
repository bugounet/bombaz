from django.http import HttpResponse
from django.template import RequestContext, loader
from django.contrib.auth.models import User
from core import check_signup_request
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

def signup_form(request):
    # if signup request is OK
    if check_signup_request(request):
        # create user 
        um = User().model
        print (um)
        um.create_user(
            request.POST['login'],
            request.POST['email'],
            request.POST['password'])
        # , then display a signup successful page
        template = loader.get_template('core/signedup_success.html')
    else:    
        # else display/redisplay subscription form.
        template = loader.get_template('core/signup_form.html')

    # create a context
    context = RequestContext(request, {
        'WEBSITE_STRINGS': WEBSITE_STRINGS,
    })
    # add user entries
    context.update(request.POST)
    
    return HttpResponse(template.render(context))

from django.http import HttpResponse
from django.template import RequestContext, loader
from django.contrib.auth.models import User
from core.forms import SubscriptionForm
from django.db import IntegrityError


def home(request):
    template = loader.get_template('core/home.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context))

def features(request):
    template = loader.get_template('core/features.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context))

def login_form(request):
    template = loader.get_template('core/login_form.html')
    context = RequestContext(request)
    return HttpResponse(template.render(context))

def signup_form(request):
    template = loader.get_template('core/home.html')
    # create a dict to store context, transation strings and so on.
    context_d = {}
    # create the request context
    context = RequestContext(request, context_d)
    # If the request method is POST, it means that the form has been submitted
    # and we need to validate it.
    if request.method == 'POST':
        # Create a RegistrationForm instance with the submitted data
        form = SubscriptionForm(request.POST)
    
        # is_valid validates a form and returns True if it is valid and
        # False if it is invalid.
        if form.is_valid():
            # The form is valid and you could save it to a database
            # by creating a model object and populating the
            # data from the form object, but here we are just
            # rendering a success template page.
            template = loader.get_template('core/signedup_success.html')
            return HttpResponse(template.render(context))
        # else add form to context so we can redisplay user entries
        context.update({
            'form': form,
        })

    context.update({'todo':'test'})
    # return HTTP response
    template = loader.get_template('core/signup_form.html')
    return HttpResponse(template.render(context))

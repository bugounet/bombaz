'''
Created on 23 avr. 2015

@author: bugounet
'''
from django.views.decorators.http import require_http_methods
from django.template.context import RequestContext
from django.contrib.auth import authenticate
from apps.core.tests import login
from apps.core.forms import LoginForm, SubscriptionForm
from django.http.response import HttpResponseRedirect, HttpResponse
from django.template import loader
from django.contrib.auth.models import User
from django.db.backends.dummy.base import IntegrityError


def do_login(request, login_form):
    """ Actual login method : takes the view request, 
    safe username and password and do authentication.
    
    Raises: ValueError with error description if credentials are
    invalid or data in form are not OK.
    Raises: RuntimeError if user is not active.
    """
    # if login_form is not valid raise an exception.
    if not login_form.is_valid():
        raise ValueError("Invalid data in form")
    
    # get data from valid login form
    data = login_form.cleaned_data
    # get user authentication credential parameters
    username = data['username']
    password = data['password']
    # try to authenticate the user
    user = authenticate(username=username, password=password)
    # if it is successful then login & redirect the user
    if user is None:
        # Return an 'invalid login' error message.
        raise ValueError("Invalid username or password.")
    
    if not user.is_active:
        # Return an 'user tempoary locked' error message.
        raise RuntimeError("Your account has been suspended")
    
    login(request, user)

@require_http_methods(["GET", "POST"])
def login_form_view(request):
    """ View method for user login
    """
    # login error string : 
    login_error = None
    # user has submitted a form: create a bound Form
    # create an empty login form
    data = request.POST if request.method is 'POST' else None
    login_form = LoginForm(data)
    
    if request.method is 'POST':
        # user has submitted a form: try to login
        try:
            do_login(request, login_form)
        except ValueError as e:
            # in case of ValueError : bad parameters or login form invalid
            # set error message
            login_error = e.message
        except RuntimeError as e:
            # in case of RuntimeError (user not active)
            # set error message
            login_error = e.message
        else:
            # Redirect to a success page if everything is fine
            return HttpResponseRedirect("lobby:index")
    # create a context and a context dictionnary
    context_d = {
        'login_form': login_form,
        'login_error': login_error
    }
    context = RequestContext(request, context_d)
    template = loader.get_template('core/login_form.html')
    return HttpResponse(template.render(context))

@require_http_methods(["GET", "POST"])
def signup_form_view(request):
    # create an errpr srting
    error_text = None
    # if POST method used, create a bound RegistrationForm instance
    # else create an empty form
    data = request.POST if request.method is 'POST' else None
    subscription_form = SubscriptionForm(data)

    # If the request method is POST, 
    # we need to validate it and try to register user
    if request.method == 'POST' and subscription_form.is_valid():
        # The form is valid we can save it to a database
        # by creating a model object and populating the
        # data from the form object
        data = subscription_form.cleaned_data
        login = data['login']
        email = data['email']
        password = data['password']
        try:
            # get the user manager and create a User
            user = User.objects.create_user(login , email, password)
        except IntegrityError:
            error_text = _("User login already taken")
        except ValueError:
            error_text = _("User name is invalid")
        else: 
            user.save()
            # render a success template page
            template = loader.get_template('core/signedup_success.html')
            return HttpResponse(template.render())
    # create a context and a context dictionnary
    context_d = {
        'subscription_form': subscription_form,
        'error': error_text,
    }
    context = RequestContext(request, context_d)
    # return HTTP response
    template = loader.get_template('core/signup_form.html')
    return HttpResponse(template.render(context))

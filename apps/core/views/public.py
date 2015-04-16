from django.http import HttpResponse
from django.template import RequestContext, loader
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from core.forms import SubscriptionForm
from django.db import IntegrityError

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

@require_http_methods(["GET", "POST"])
def login_form(request):
    context = RequestContext(request)
    if request.method == 'POST':
        # user has submitted a form
        # get user authentication credential parameters
        username = request.POST['username']
        password = request.POST['password']
        # try to authenticate the user
        user = authenticate(username=username, password=password)
        # if it is successful then login & redirect the user
        if user is not None:
            if user.is_active:
                login(request, user)
                # Redirect to a success page.
            else:
                # Return an 'user tempoary locked' error message.
                context.update({"loginError":_("Your account has been suspended")})
        else:
            # Return an 'invalid login' error message.
            context.update({"loginError":_("Invalid username or password.")})
        # The form is invalid and you 
        # rendering a success template page.
        template = loader.get_template('core/login_success.html')
        return HttpResponse(template.render(context))
    template = loader.get_template('core/login_form.html')
    return HttpResponse(template.render(context))

@require_http_methods(["GET", "POST"])
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
            # The form is valid we can save it to a database
            # by creating a model object and populating the
            # data from the form object
            login = request.POST['login']
            email = request.POST['email']
            password = request.POST['password']
            # get the user manager and create a User
            user_mgr = User.objects
            user_mgr.create_user(login , email, password)
            # render a success template page
            template = loader.get_template('core/signedup_success.html')
            return HttpResponse(template.render(context))
        # else add form to context so we can redisplay user entries
        context.update({
            'form': form,
            'error': ("one or more fields are invalid.")
        })

    # return HTTP response
    template = loader.get_template('core/signup_form.html')
    return HttpResponse(template.render(context))

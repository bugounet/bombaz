def check_signup_request(request):
    if not request.method == 'POST':
        # it is not a good sign-up request
        return False
    if 'login' not in request.POST or \
       not len(request.POST['login'].strip()):
        # request contains no login field
        return False
    if 'email' not in request.POST or \
       not len(request.POST['email'].strip()):
        # request contains no email field
        return False
    if 'password' not in request.POST or \
       not len(request.POST['password'].strip()):
        # request contains no password field
        return False
    return True

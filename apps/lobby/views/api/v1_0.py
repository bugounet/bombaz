from django.http import HttpResponse
from json import dumps


def scores(request):
    response = {'list': [1, 2, 3, 4, 5, 6, 6]}
    return HttpResponse(dumps(response))

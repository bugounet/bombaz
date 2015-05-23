# from django.template import RequestContext, loader
from django.views.decorators.http import require_GET, require_POST
# from django.shortcuts import render


# should be REST routes
@require_POST
def accept(request):
    """
    When player answers yes
    Expect to accept the proposal and return acceptance list
    """
    return

@require_POST
def deny(request):
    """
    When player doesn't answer or denies
    Expect player removal
    """
    return

@require_POST
def join(request):
    """
    When player requests a new match maker game

    Expect loading time
    """
    return

@require_GET
def get_pool_status(request):
    """
    Return pool status :
    -new
    -ready
    -choice_request
    -completed

    if status is new, return refresh time
    if status is ready, return a timestamp to display the popup
    if status is choice_request, return list of players
    if status is completed, return the Match model ID.

    if all gamers complete the acceptation phase, the status goes to complete.
    else status goes to new again (with a little refresh time)

    expect a timestamp to display accept match popup
    :return:
    """
    return


def pool_new(request):
    return

def pool_ready(request):
    return

def pool_choice_request(request):
    return

def pool_completed(request):
    return

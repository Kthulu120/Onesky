import json

from annoying.decorators import ajax_request
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from scriptly.utilities import get_drives, speedtest

from django.shortcuts import render
from django.shortcuts import render
from django.utils import timezone
from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect

# Create your views here.


def index(request):
   # if not request.user.is_authenticated():
    #    redirect('admin')
    context = {}
    hdspace = get_drives
    context["hdspace"] = hdspace
    # Only return posts from users that are being followed, test this later
    # for performance / improvement
    return render(request, 'feeds/dashboard.html', context)


@ajax_request
def get_ethernet_speed(request):
    context = {}
    speed = speedtest()
    if speed is None:
        speed = [0, 0]
    context["upload"] = speed[0]
    print (context["upload"])
    context["download"] = speed[1]
    return JsonResponse(json.dumps(context), safe=False)
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/speedtest', views.get_ethernet_speed, name='get_ethernet_speed')
  #  url(r'^bucketlists/$', CreateView.as_view(), name="create"),
  #  url(r'^bucketlists/(?P<slug>[\w.@+-]+)/',
  #      DetailsView.as_view(), name="details"),
  #  url(r'^note/(?P<title>[\w.@+-]+)/$', views.loadNote, name='load_note')




    #url(r'^post/(?P<pk>\d+)/$', views.notebook_index, name='post_detail'),
   # url(r'^post/new/$', views.post_new, name='post_new'),
]
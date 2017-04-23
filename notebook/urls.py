from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from notebook.views import CreateView, DetailsView
from . import views

urlpatterns = [
    url(r'^notebook/$', views.notebook_index, name='notebook_index'),
    url(r'^bucketlists/$', CreateView.as_view(), name="create"),
    url(r'^bucketlists/(?P<slug>[\w.@+-]+)/',
        DetailsView.as_view(), name="details"),
    url(r'^note/(?P<title>[\w.@+-]+)/$', views.loadNote, name='load_note')




    #url(r'^post/(?P<pk>\d+)/$', views.notebook_index, name='post_detail'),
   # url(r'^post/new/$', views.post_new, name='post_new'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
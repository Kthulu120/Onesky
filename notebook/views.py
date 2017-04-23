from annoying.decorators import ajax_request
from django.shortcuts import render
from django.shortcuts import render
from django.utils import timezone
from .models import Note
from rest_framework import generics
from .serializers import NoteSerializer
from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
# Create your views here.

def notebook_index(request):
    posts = Note.objects.order_by('posted_on')
    return render(request, 'apps/notebook.html', {'posts': posts})

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    lookup_field = 'slug'
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    lookup_field = 'slug'
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

@ajax_request
def loadNote(request,title):
    try:
        k = title
        queryset= Note.objects.all().filter(title=k)
        if queryset:
            data = queryset['title', 'info']
            return data

    except Note.DoesNotExist:
        return ""

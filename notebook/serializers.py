# api/serializers.py

from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Note
        fields = ('id', 'title', 'posted_on', 'info', 'slug')
        read_only_fields = ('posted_on', 'slug')

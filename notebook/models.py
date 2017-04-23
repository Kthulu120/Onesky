from __future__ import unicode_literals

from datetime import datetime
from django.db import models
from django.template.defaultfilters import slugify


class Note(models.Model):
    title = models.CharField(max_length=32, unique=True)
    info = models.TextField(max_length=None)
    collection = models.CharField(max_length=32, blank=True, null=True)
    posted_on = models.DateTimeField(default=datetime.now())
    slug = models.SlugField(blank=False, null=False,)

    def __str__(self):
        return self.title
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Note, self).save(*args, **kwargs)
from django import template
import re

from notebook.models import Note

register = template.Library()


def cycle_original(param, param1):
    pass


@register.tag
def cycle(*args, **kwargs):
    ''' A stub to get SortableTabularInline to work '''
    return cycle_original(*args, **kwargs)

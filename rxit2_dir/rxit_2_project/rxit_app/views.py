from django.shortcuts import render

# Basic view to open the app

def index(request, path=''):
    """
    The home page. This renders the container for the single-page app.
    """
    return render(request, 'index.html')


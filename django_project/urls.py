from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin', admin.site.urls),
    path('', include('main.urls')),  # no prefix, can access / and /hi/
]

from django.urls import include, path
from api import views


app_name = 'api'

urlpatterns = [
    path('generate-post/', views.PostView.as_view(), name="post"),
]
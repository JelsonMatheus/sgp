from django.urls import include, path
from core import views


app_name = 'core'

urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('account/login/', views.CoreLoginView.as_view(), name='login'),
    path('account/logout/', views.CoreLogoutView.as_view(), name='logout'),
    path('add-post/', views.CretePostView.as_view(), name='create')
]
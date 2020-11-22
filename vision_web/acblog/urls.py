from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt import views as jwt_views

from .views import *

urlpatterns = [
	path('users/<str:stat>/',api_get_users),#all users list
	path('register',RegisterView.as_view()),#user registration
	path('check_token/<str:token>',RegisterView.as_view()),#user verification
	path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),#Auhorizations
	path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
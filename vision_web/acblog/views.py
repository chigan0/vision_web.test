from datetime import timedelta

from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.contrib.auth.models import User,Group
from django.core.mail import send_mail
from django.utils import timezone

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import UserProfileSerializer
from .models import UserToken

#класс для регистрации и проверки токена пользователям 
class RegisterView(GenericAPIView):
	def post(self,request):
		serializers = UserProfileSerializer(data=request.data)

		if serializers.is_valid():
			serializers.save()
			return Response(serializers.data,status=status.HTTP_201_CREATED)

		return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

	def get(self,request,token):
		valid = UserToken.objects.filter(token__exact=token).all()

		if len(valid)>0:
			user = User.objects.filter(username__exact=valid[0].user).get()
			user.is_active = True
			user.save(),valid.delete()

			return redirect('/')

		return JsonResponse({'status':'This token is not valid'},status=400)


#функция для получения списка пользователей 
@api_view(['GET','POST'])
def api_get_users(request,stat):
	if request.method == 'GET':
		if stat.lower() == 'all':
			user = User.objects.all()
		
		elif stat.lower() == 'online':
			tim = (timezone.now()-timedelta(minutes=15))
			user = User.objects.filter(last_login__gt=tim).all()

		serializers = UserProfileSerializer(user,many=True)
		return Response(serializers.data)
	
	elif request.method == 'POST':
		return JsonResponse({'status':'true'},safe=False)


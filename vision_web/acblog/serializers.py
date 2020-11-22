from uuid import uuid4
from threading import Thread

from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives

from rest_framework import serializers

from .models import UserToken

#функция для отпраки собщения на почту 
def email(email,title,text,ematl_from,email_to):
	text_content = title
	html_content = f'<p>This is an <strong>{text}</strong> message.</p>'
	
	msg = EmailMultiAlternatives('Hello', text_content, ematl_from, [email_to])
	msg.attach_alternative(html_content, "text/html")
	return msg.send()
#класс сериалайзер для rest api
class UserProfileSerializer(serializers.ModelSerializer):
	username = serializers.CharField(max_length=64,min_length=2)
	email = serializers.EmailField(max_length=64,min_length=5)
	first_name = serializers.CharField(max_length=16,min_length=2)
	last_name = serializers.CharField(max_length=16,min_length=2)
	password = serializers.CharField(
		max_length=65,min_length=4,write_only=True
	)
	class Meta:#мета данные
		model = User
		fields = ['username','last_name','first_name','email','password']

	def validate(self,attrs):#неболшая валидация
		if User.objects.filter(username=attrs['username']).exists():
			raise serializers.ValidationError('Username is use')

		return super().validate(attrs)

	def create(self,validated_data):#Регистрация пользователя и асинхронная отправка письма на почту
		user = User.objects.create_user(
				username=validated_data['username'],
				email=validated_data['email'],
				password=validated_data['password'],
				last_name=validated_data['last_name'],
				first_name=validated_data['first_name'],
				is_active=False
			)
		user.save()
		
		a = UserToken(user=user,token=uuid4().hex)
		a.save()

		Thread(target=email,daemon=True,args=(
				user.email,
				'Verification',
				f"http://127.0.0.1:8000/api/check_token/{a.token}",
				'naz.abylai50@gmail.com',
				user.email
			)).start()


		return user

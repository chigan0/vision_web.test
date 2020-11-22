from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#Таблица для временного хранения имя пользователя и токена
class UserToken(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	token = models.CharField(max_length=255)

	def __str__(self):
		return f"User {self.user}"


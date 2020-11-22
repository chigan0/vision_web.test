from django.shortcuts import render

def test(request):
	return render(request,'webinar-tools-for-transformation.html')
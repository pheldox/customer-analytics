from django.urls import path
from . import views

urlpatterns = [

    path('predict/', views.predictCustomer, name="predict"),
]

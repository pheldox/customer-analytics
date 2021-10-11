from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from base.models import Prediction
from base.serializers import PredictionSerializer

import numpy as np
import tensorflow as tf
import pickle

# Create your views here.


@api_view(['GET'])
def getPredictions(request):
    return_data = "Successful",

    return Response(return_data)


@api_view(['POST'])
def predictCustomer(request):
    data = request.data
    try:
        book_length_tot = data['book_length_tot']
        book_length_avg = data['book_length_avg']
        price_tot = data['price_tot']
        price_avg = data['price_avg']
        review = data['review']
        min_listened = data['min_listened']
        completion = data['completion']
        support_requests = data['support_requests']
        last_visited = data['last_visited']
        purchase_date = data['purchase_data']
        fields = [book_length_tot, book_length_avg, price_tot, price_avg, review,
                  min_listened, completion, support_requests, last_visited, purchase_date]

        if not None in fields:
            book_length_tot = float(book_length_tot)
            book_length_avg = float(book_length_avg)
            price_tot = float(price_tot)
            price_avg = float(price_avg)
            review = float(review)
            min_listened = float(min_listened)
            completion = float(completion)
            support_requests = float(support_requests)
            last_visited = float(last_visited)
            purchase_date = float(purchase_date)

            result = [book_length_tot, book_length_avg, price_tot, price_avg, review,
                      min_listened, completion, support_requests, last_visited, purchase_date]

            model_path = 'ml_model/audiobooks_model.h5'
            scaler_path = 'ml_model/scaler_deep_learning.pickle'
            load_model = tf.keras.models.load_model(model_path)
            load_scaler = pickle.load(open(scaler_path, 'rb'))

            scaled = load_scaler.transform(np.reshape(result, (1, -1)))
            prediction = np.argmax(load_model.predict(scaled), 1)
            predicted = float(prediction)
            target = float(prediction)
            pred = Prediction.objects.create(
                book_length_tot=book_length_tot,
                book_length_avg=book_length_avg,
                price_tot=price_tot,
                price_avg=price_avg,
                review=review,
                min_listened=min_listened,
                completion=completion,
                support_requests=support_requests,
                last_visited=last_visited,
                purchase_date=purchase_date,
                target=target
            )
            pred.save()

        else:
            return Response({
                'detail': 'Form contains errors and missing data'
            }, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Error(s) discovered'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = PredictionSerializer(pred, many=False)
    return Response(serializer.data)

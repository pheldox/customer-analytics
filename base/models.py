from django.db import models

# Create your models here.


class Prediction(models.Model):
    book_length_tot = models.IntegerField(null=True, blank=True, default=0)
    book_length_avg = models.IntegerField(null=True, blank=True, default=0)
    price_tot = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    price_avg = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    review = models.IntegerField(null=True, blank=True, default=0)
    min_listened = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    completion = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    support_requests = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    last_visited = models.IntegerField(null=True, blank=True, default=0)
    purchase_date = models.IntegerField(null=True, blank=True, default=0)
    target = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.target)


import datetime
from django.db import models
from django.contrib.auth.models import User

class StockGroup(models.Model):

    name = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.name


class Stock(models.Model):
    name = models.CharField(max_length=100, blank=True, null=False, default=u'')
    stock_group = models.ForeignKey(StockGroup)	

    def __str__(self):
        return self.name


class StockAllocation(models.Model):
    stock = models.ForeignKey(Stock)
    user  = models.ForeignKey(User, blank=True, null=True)
    allocated_at   = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    deallocated_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.stock.name
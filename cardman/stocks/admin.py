from django.contrib import admin
from .models import Stock, StockGroup, StockAllocation

admin.site.register(Stock)
admin.site.register(StockGroup)
admin.site.register(StockAllocation)
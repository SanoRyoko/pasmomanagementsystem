from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required

from .stocks.models import StockAllocation

@staff_member_required
def index_view(request):
    if request.method == 'GET':
    	user = request.user
    	my_allocations = StockAllocation.objects.filter(user = user, deallocated_at = None)
    	my_allocation = my_allocations[0] if my_allocations else None
        return render(request, 'index.html', {
        	'user' : user,
        	'my_allocation' : my_allocation
        	})
from django.http import JsonResponse

def error_404(request, exception):
    message = ("The endpoint not found")
    response = JsonResponse(data={"message": message, "status_code": 404})
    response.status_code = 404
    return response


def error_500(request):
    message = ("An error occured")
    response = JsonResponse(data={"message": message, "status_code": 500})
    response.status_code = 500
    return response
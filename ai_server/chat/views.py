from typing import Dict, Union
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .llm_call import call as llm_call

@api_view(["GET", "POST"])
def home(request):
    return Response(
        {"success":True ,"message":"connected successfully"},
        status=status.HTTP_200_OK
        )

@api_view(["POST"])
def index(request):
    content: dict = request.data
    query = content.get("query")
    if query is None:
        return Response(
            {"success": False, "message": "query is required !"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if not isinstance(query, str):
        return Response(
            {"success": False, "message": "query should be str !"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if not query:
        return Response(
            {"success": False, "message": "query should not be empty"},
            status=status.HTTP_400_BAD_REQUEST,
        )
        
    response:Dict[str, Union[bool, str]] = llm_call(query)
    
    if not response["success"]:
        return Response(
            response,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    
    return Response(
        response,
        status=status.HTTP_200_OK,
    )
  

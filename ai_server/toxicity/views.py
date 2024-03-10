from typing import Dict, Union
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .hf_call import call as hf_call

@api_view(["POST"])
def index(request):
    content: dict = request.data
    text = content.get("text")
    if text is None:
        return Response(
            {"success": False, "message": "text is required !"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if not isinstance(text, str):
        return Response(
            {"success": False, "message": "text should be str !"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if not text:
        return Response(
            {"success": False, "message": "query should not be empty"},
            status=status.HTTP_400_BAD_REQUEST,
        )
        
    response:Dict[str, Union[bool, str]] = hf_call(text=text)
    
    if not response["success"]:
        return Response(
            response,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    
    return Response(
        response,
        status=status.HTTP_200_OK,
    )
  

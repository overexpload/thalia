from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


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
        
    return Response(
        {"success": True, "message": f"answer - {query}"},
        status=status.HTTP_200_OK,
    )

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ChatRequestSerializer, ChatResponseSerializer
from .services import get_chat_response


class ChatView(APIView):
    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_message = serializer.validated_data["message"]
        history = serializer.validated_data["history"]

        try:
            reply = get_chat_response(user_message, history)
            response_data = ChatResponseSerializer({"reply": reply})
            return Response(response_data.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
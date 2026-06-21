from rest_framework import serializers


class MessageHistorySerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=["user", "assistant"])
    content = serializers.CharField()


class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=2000)
    history = MessageHistorySerializer(many=True, required=False, default=list)


class ChatResponseSerializer(serializers.Serializer):
    reply = serializers.CharField()
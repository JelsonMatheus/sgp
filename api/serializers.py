from rest_framework import serializers
from api import chatgpt

DES = 'Encontre os melhores preços em um só lugar! Nossa plataforma de pesquisa e comparação de preços é a solução ideal para economizar. Compare instantaneamente e encontre as melhores ofertas em eletrônicos, moda, beleza e muito mais. Não perca tempo e dinheiro! Acesse agora mesmo e comece a economizar. 💰🔍 #ComparaçãoDePreços'
TAG = ['#EconomizeMais', '#ComparaçãodePreços', '#EncontreAsMelhoresOfertas']


class PostSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()

    def create(self, validated_data):
        text = chatgpt.get_post(
            validated_data['title'], 
            validated_data['description']
        )
        tags = chatgpt.get_tags(
            text
        )
        return {
            'text': text,
            'tags': tags.split()
        }

import openai
from settings.settings import GPT_KEY


def get_tags(text):
    print(text)
    openai.api_key = GPT_KEY
    response = openai.Completion.create(
        model="text-curie-001",
        prompt=f"Gere 3 hashtag para: {text}",
        temperature=0.5,
        max_tokens=100,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response.choices[0].text.strip()


def get_post(title, description):
    openai.api_key = GPT_KEY
    response = openai.Completion.create(
        model="text-curie-001",
        prompt=description,
        temperature=0.5,
        max_tokens=100,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0,
        stop=["[STOP_SEQUENCE]"],
        n=1
    )
    return response.choices[0].text.strip()
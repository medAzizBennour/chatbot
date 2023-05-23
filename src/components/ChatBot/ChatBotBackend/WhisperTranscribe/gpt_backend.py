import openai
import sample_config as config

openai.api_key = config.OPENAI_API_KEY
messages=[{"role": "system", "content" : "You are a friendly trading chatbot. Answer as concisely as possible.only short answers of max 20 words.\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-04-04"},
    {"role": "user", "content" : "How are you?"},
    {"role": "assistant", "content" : "I am doing well"},
    {"role": "user", "content" : "define equity"},
    {"role":"assistant","content":"Equity is fairness and justice in the distribution of resources, opportunities, and treatment among individuals and groups, regardless of their differences."}]
def GptMessage(message):
    model="gpt-3.5-turbo"
    prompt="you are a trading voice assistant that can answer the user's questions in short responses. maximum 50 tokens of answer"
    messages.append({"role":"user","content":message})
    print(messages)
    response = openai.ChatCompletion.create(
    model=model,
    messages=messages
    )
    reply=response.choices[0].message.content
    print(reply)
    messages.append({"role":"assistant","content":reply})
    return reply


from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
import json

from rasa_sdk.events import SlotSet, EventType

import requests
class SubmitStockPriceAction(Action):
    def name(self) -> Text:
        return "action_submit_stock_price"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        # Get latest user message
        symbol = tracker.get_slot("stock_company")
        latest_message = tracker.latest_message

        intent = latest_message['intent']['name']

        
        if symbol:
            url = "https://yfinance-stock-market-data.p.rapidapi.com/stock-info"

            payload = { "symbol": symbol }
            headers = {
	        "content-type": "application/x-www-form-urlencoded",
	        "X-RapidAPI-Key": "8750a43ff9mshc5e93c95f125d36p1c9abajsnbcbe6e11bdd2",
	        "X-RapidAPI-Host": "yfinance-stock-market-data.p.rapidapi.com"
            }

            response = requests.post(url, data=payload, headers=headers)
            if response:
                info=response.json()['data']
            
                response_message = f"The current price of {symbol} is {info['currentPrice']}"
            else:
               response_message = f"The security {symbol} is not registered"
            response_dict = {"intent": intent, "response":response_message }

        else:
            response_message = f"Please provide a valid security symbol for me to assist you further."
            response_dict = {"intent": intent, "response": response_message}
        
        dispatcher.utter_message(dispatcher.utter_message(json.dumps(response_dict)))

        return []
    

class SubmitStockNewsAction(Action):
    def name(self) -> Text:
        return "action_submit_stock_news"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        # Get latest user message
        symbol = tracker.get_slot("stock_company")
        latest_message = tracker.latest_message

        intent = latest_message['intent']['name']

        
        if symbol:
            url = "https://yfinance-stock-market-data.p.rapidapi.com/news"

            payload = { "symbol": symbol }
            headers = {
	        "content-type": "application/x-www-form-urlencoded",
	        "X-RapidAPI-Key": "8750a43ff9mshc5e93c95f125d36p1c9abajsnbcbe6e11bdd2",
	        "X-RapidAPI-Host": "yfinance-stock-market-data.p.rapidapi.com"
            }

            response = requests.post(url, data=payload, headers=headers)
            if response:
                info=response.json()['data'][:3]
                response_message = f"Here are the latest news about {symbol} :"
                buttons = []

                i=1
                for element in info:
                    nl = '\n'
                    title=element["title"]
                    link=element["link"]
                    button = {
                        "title": title,
                        "payload": link
                    }
                    buttons.append(button)

                    json_res =f"Title {i}: <a href='{link}'>{title}</a>"
                    i+=1
                dispatcher.utter_message(text=response_message, buttons=buttons)

                   # response_message+=f"{nl} {json_res}"
            else:
               response_message = f"The security {symbol} is not registered"
            response_dict = {"intent": intent, "response":response_message }

        else:
            response_message = f"Please provide a valid security symbol for me to assist you further."
            response_dict = {"intent": intent, "response": response_message}
        
        #dispatcher.utter_message(json.dumps(response_dict))

        return []
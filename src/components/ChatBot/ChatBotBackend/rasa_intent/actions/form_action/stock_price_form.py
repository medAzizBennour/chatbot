from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, EventType
import json
#import yfinance as yf
import requests

#api key : 4KMJF05S56CRWJ9P
class StockPriceAction(Action):

    def name(self) -> Text:
        return "action_stock_price"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict
    ) -> List[EventType]:
        latest_message = tracker.latest_message
        # Get intent and extracted entities
        symbol = "AAPL"
        response_dict = {"intent": "stock_price", "response": "waa"}

        dispatcher.utter_message(json_message=response_dict)
        if symbol:
            url = "https://yfinance-stock-market-data.p.rapidapi.com/stock-info"

            payload = { "symbol": "AAPL" }
            headers = {
	        "content-type": "application/x-www-form-urlencoded",
	        "X-RapidAPI-Key": "8750a43ff9mshc5e93c95f125d36p1c9abajsnbcbe6e11bdd2",
	        "X-RapidAPI-Host": "yfinance-stock-market-data.p.rapidapi.com"
            }

            response = requests.post(url, data=payload, headers=headers)
            info=response.json()['data']
            
            #if ticker.info:
             #   info = ticker.info
            response_message = f"The current price of {symbol} is {info['currentPrice']}"
            #else:
             #   response_message = f"The security {name} is not registered"
            response_dict = {"intent": "stock_price", "response":response_message }

        else:
            response_message="the securoty not registered"
            response_dict = {"intent": "stock_price", "response": response_message}
        

        response_dict = {"intent": "stock_price", "response": response_message}

        dispatcher.utter_message(json_message=response_dict)

        return []
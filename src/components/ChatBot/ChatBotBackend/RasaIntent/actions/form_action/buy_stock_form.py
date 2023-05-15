from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, EventType
import json



    

class AskForStockCompanyAction(Action):
    def name(self) -> Text:
        return "action_ask_stock_company"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:

        response_message="Please specify the name of the security"
        # Get latest user message
        latest_message = tracker.latest_message
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        stock_number = tracker.get_slot("stock_number")
        stock_company = tracker.get_slot("stock_company")
        response_dict = {"intent": intent, "entities": [{"stock_number":stock_number},{"stock_company":stock_company}], "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return []

class AskForStockNumAction(Action):
    def name(self) -> Text:
        return "action_ask_stock_number"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        response_message="Please specify the number of shares"

          # Get latest user message
        latest_message = tracker.latest_message
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        stock_number = tracker.get_slot("stock_number")
        stock_company = tracker.get_slot("stock_company")
        response_dict = {"intent": intent, "entities": [{"stock_number":stock_number},{"stock_company":stock_company}], "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return []

     
class AskForStockNumAction(Action):
    def name(self) -> Text:
        return "action_ask_destination"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        response_message="Please specify the destination"

          # Get latest user message
        latest_message = tracker.latest_message
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        stock_number = tracker.get_slot("stock_number")
        stock_company = tracker.get_slot("stock_company")
        destination = tracker.get_slot("destination")
        order = tracker.get_slot("order")

        response_dict = {"intent": intent, "entities":{"order":order,"stock_number":stock_number,"stock_company":stock_company,"destination":destination}, "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return []

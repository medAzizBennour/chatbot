
from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
import json

from rasa_sdk.events import SlotSet, EventType


class SubmitOrderFormAction(Action):
    def name(self) -> Text:
        return "action_submit_order_form"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        # Get latest user message
        latest_message = tracker.latest_message
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        stock_number = tracker.get_slot("stock_number")
        stock_company = tracker.get_slot("stock_company")
        security_symbol = tracker.get_slot("security_symbol")
        action=tracker.get_slot("order")

        response_message="Processing command..."
        destination = tracker.get_slot("destination")

        response_dict = {"intent": intent, "entities": {"stock_number":stock_number,"action":action,"stock_company":stock_company,"security_symbol":security_symbol,"destination":destination,"confirmation":True}, "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return [SlotSet("stock_company", None),SlotSet("stock_number", None),SlotSet("destination", None),SlotSet("security_symbol",None)]
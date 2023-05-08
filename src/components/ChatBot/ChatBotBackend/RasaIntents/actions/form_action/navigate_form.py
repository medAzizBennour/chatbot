from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, EventType
import json



    

class AskForPageAction(Action):
    def name(self) -> Text:
        return "action_ask_page"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:

        response_message="Please specify the page"
        # Get latest user message
        latest_message = tracker.latest_message
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        page = tracker.get_slot("page")
        response_dict = {"intent": intent, "entities": {"page":page}, "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return []
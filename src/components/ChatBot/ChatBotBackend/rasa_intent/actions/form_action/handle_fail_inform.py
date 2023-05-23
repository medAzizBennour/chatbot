






from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, EventType,AllSlotsReset
import json



    

class HandleFailInformAction(Action):
    def name(self) -> Text:
        return "action_handle_fail_inform"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:

        response_message="Can you please enter a valid command?"
        # Get latest user message
        latest_message = tracker.latest_message
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        response_dict = {"intent": intent, "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return [AllSlotsReset()]





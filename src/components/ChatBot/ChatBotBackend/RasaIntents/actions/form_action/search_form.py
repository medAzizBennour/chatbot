from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, EventType
import json



    

class AskForQueryAction(Action):
    def name(self) -> Text:
        return "action_ask_query"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:

        # Get latest user message
        latest_message = tracker.latest_message
        param=tracker.latest_message['entities']
        response_message=f"Please specify what you like to search {param}"

        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        query = tracker.get_slot("query")
        response_dict = {"intent": intent, "entities": {"query":query}, "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return []
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

        latest_message = tracker.latest_message.get("text")
        parameter = None
        message=latest_message.lower()
        if "search for" in message or "search for" in message:           
            parameter = message.split("search for", 1)[-1].strip()
            if parameter:
                response_message = f"Searching for {parameter}"
            else:
                response_message = "Please specify what you would like to search"

        # Get intent from tracker.latest_message['intent']
        intent = tracker.latest_message['intent'].get('name') if 'intent' in tracker.latest_message else None

        response_dict = {
            "intent": intent,
            "entities": {"query": parameter},
            "response": response_message
        }

        dispatcher.utter_message(json.dumps(response_dict))
        return []

from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
import json

from rasa_sdk.events import SlotSet, EventType


class SubmitSearchFormAction(Action):
    def name(self) -> Text:
        return "action_submit_search_form"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        # Get latest user message
        latest_message = tracker.latest_message
        message = tracker.latest_message.get("text")
        parameter = message.split("search for", 1)[1].strip()
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        response_message=f"Searching for {parameter}"
        

        response_dict = {"intent": intent, "entities": {"query":parameter}, "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return [SlotSet("query", None)]
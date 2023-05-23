
from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
import json

from rasa_sdk.events import SlotSet, EventType


class SubmitFilterFormAction(Action):
    def name(self) -> Text:
        return "action_submit_filter_form"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        # Get latest user message
        latest_message = tracker.latest_message
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        filtered_obj = tracker.get_slot("filtered_obj")
        criteria = tracker.get_slot("criteria")
        response_message="Processing filter command..."
        

        response_dict = {"intent": intent, "entities": {"filtered_obj":filtered_obj,"criteria":criteria}, "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return [SlotSet("filtered_obj", None),SlotSet("criteria", None)]
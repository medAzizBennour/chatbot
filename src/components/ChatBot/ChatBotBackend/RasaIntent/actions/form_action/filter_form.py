from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, EventType
import json



    

class AskForFilteredObjAction(Action):
    def name(self) -> Text:
        return "action_ask_filtered_obj"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:

        response_message="Please specify what you want to filter"
        # Get latest user message
        latest_message = tracker.latest_message
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        filtered_obj = tracker.get_slot("filtered_obj")
        criteria = tracker.get_slot("criteria")
        response_dict = {"intent": intent, "entities": {"filtered_obj":filtered_obj,"criteria":criteria}, "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return []

class AskForCriteriaAction(Action):
    def name(self) -> Text:
        return "action_ask_criteria"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        response_message="Please specify the filter criterias"

          # Get latest user message
        latest_message = tracker.latest_message
        
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        filtered_obj = tracker.get_slot("filtered_obj")
        criteria = tracker.get_slot("criteria")
        response_dict = {"intent": intent, "entities": {"filtered_obj":filtered_obj,"critera":criteria}, "response": response_message}

        dispatcher.utter_message(json.dumps(response_dict))
        return []

     


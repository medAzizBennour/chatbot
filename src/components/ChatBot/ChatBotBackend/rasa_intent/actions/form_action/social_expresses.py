
from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
from rasa_sdk.events import SlotSet, EventType,AllSlotsReset
import random
import json


class SocialExpressesAction(Action):

    def name(self) -> Text:
        return "action_social_expresses"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Get latest user message
        latest_message = tracker.latest_message
        intent_template_map = {
            "greet": "utter_greet",
            "goodbye": "utter_goodbye",
            "thank":"utter_thank",
            "bot_challenge":"utter_iamabot",
            "help":"utter_help"
        }
        # Get intent and extracted entities
        intent = latest_message['intent']['name']
        template_key = intent_template_map.get(intent, "utter_default")


        response = random.choice(domain["responses"][template_key])
        response_dict = {"intent": intent, "response":response["text"]}
        # Send response message using dispatcher
        dispatcher.utter_message(json.dumps(response_dict))

        return []
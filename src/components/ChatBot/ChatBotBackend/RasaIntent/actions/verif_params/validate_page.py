

from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict

from rasa_sdk.events import SlotSet, EventType


class ValidatePage(FormValidationAction):
    def name(self) -> Text:
        return "validate_navigate_form"

    @staticmethod
    def pages_list() -> List[Text]:
        """supported pages"""
        pages_list = ["orders", "placements", "dashboard","setting","profile","portfolio"]

        return pages_list

    def validate_page(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate page."""

        if slot_value.lower() in self.pages_list():
            # validation succeeded, set the value of the "cuisine" slot to value
            return {"page": slot_value}
        else:
            response_message="Invalid page"
        


            dispatcher.utter_message(text=response_message)
            # validation failed, set this slot to None so that the
            # user will be asked for the slot again
            return {"page": None}
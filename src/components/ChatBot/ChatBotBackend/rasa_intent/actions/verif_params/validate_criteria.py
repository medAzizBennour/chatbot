
from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict

from rasa_sdk.events import SlotSet, EventType




class ValidateFilteredObj(FormValidationAction):
    def name(self) -> Text:
        return "validate_filter_form"

    @staticmethod
    def criterias_list() -> List[Text]:
        """supported pages"""
        creterias_list = ["closed", "filled", "working","paused","new","pending"]

        return creterias_list

    def validate_criteria(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate criteria."""

        if slot_value.lower() in self.criterias_list():
            # validation succeeded, set the value of the "cuisine" slot to value
            return {"criteria": slot_value}
        else:
            # validation failed, set this slot to None so that the
            # user will be asked for the slot again
            return {"criteria": None}
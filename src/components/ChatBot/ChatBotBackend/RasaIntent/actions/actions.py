from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict

from rasa_sdk.events import SlotSet, EventType

from .form_action.buy_stock_form import AskForStockNumAction,AskForStockCompanyAction
from .form_action.navigate_form import AskForPageAction
from .form_action.search_form import AskForQueryAction
from .form_action.handle_fail_inform import HandleFailInformAction
from .form_action.fallback import FallbackAction
from .form_action.filter_form import AskForFilteredObjAction
from .form_action.filter_form import AskForCriteriaAction
from .form_action.social_expresses import SocialExpressesAction

from .submit_action.submit_navigate_form import SubmitNavigateFormAction
from .submit_action.submit_order_form import SubmitOrderFormAction
from .submit_action.submit_search_form import SubmitSearchFormAction
from .submit_action.submit_filter_form import SubmitFilterFormAction

from .verif_params.validate_stock_company import ValidateStockCompany
from .verif_params.validate_page import ValidatePage
from .verif_params.validate_filtered_obj import ValidateFilteredObj
from .verif_params.validate_criteria import ValidateFilteredObj



class ValidateRestaurantForm(FormValidationAction):
    def name(self) -> Text:
        return "validate_restaurant_form"

    async def required_slots(
        self,
        domain_slots: List[Text],
        dispatcher: "CollectingDispatcher",
        tracker: "Tracker",
        domain: "DomainDict",
    ) -> List[Text]:
        additional_slots = ["outdoor_seating"]
        if tracker.slots.get("outdoor_seating") is True:
            # If the user wants to sit outside, ask
            # if they want to sit in the shade or in the sun.
            additional_slots.append("shade_or_sun")

        return additional_slots + domain_slots
    
    async def extract_outdoor_seating(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> Dict[Text, Any]:
        text_of_last_user_message = tracker.latest_message.get("text")
        sit_outside = "outdoor" in text_of_last_user_message

        return {"outdoor_seating": sit_outside}
    
class AskForSlotAction(Action):
    def name(self) -> Text:
        return "action_ask_restaurant_form_cuisine"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        dispatcher.utter_message(text="What cuisine?")
        return []

class AskForSlotAction(Action):
    def name(self) -> Text:
        return "action_ask_restaurant_form_num_people"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        dispatcher.utter_message(text="For how many people?")
        return []

class AskForSlotAction(Action):
    def name(self) -> Text:
        return "action_ask_restaurant_form_outdoor_seating"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        dispatcher.utter_message(text="would you like to sit outside?")
        return []
     
class ValidateRestaurantForm(FormValidationAction):
    def name(self) -> Text:
        return "validate_restaurant_form"

    @staticmethod
    def cuisine_db() -> List[Text]:
        """Database of supported cuisines"""

        return ["caribbean", "chinese", "french","italian"]

    def validate_cuisine(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate cuisine value."""

        if slot_value.lower() in self.cuisine_db():
            # validation succeeded, set the value of the "cuisine" slot to value
            return {"cuisine": slot_value}
        else:
            # validation failed, set this slot to None so that the
            # user will be asked for the slot again
            return {"cuisine": None}

class SubmitFormAction(Action):
    def name(self) -> Text:
        return "action_submit_form"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
    ) -> List[EventType]:
        dispatcher.utter_message(text="submiiiit")
        return []
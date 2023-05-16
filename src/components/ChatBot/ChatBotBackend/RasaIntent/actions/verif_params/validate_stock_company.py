

from typing import Dict, Text, Any, List, Union

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict

from rasa_sdk.events import SlotSet, EventType
from ..retrieveDataFromDB import RetrieveDataFromDB

class ValidateStockCompany(FormValidationAction):
    def name(self) -> Text:
        return "validate_place_order_form"

    @staticmethod
    def securities_list() -> List[Text]:
        """Database of stocks"""
   
        return []

    def validate_stock_company(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        """Validate stock value."""
        data = RetrieveDataFromDB()
        data.run(dispatcher, tracker, domain)
        securities = tracker.get_slot("stock_map")
        security_list = securities[0]
    
        if securities and slot_value in security_list.keys():
            name = security_list[slot_value]
        # Validation succeeded, set the value of the "stock_company" slot to slot_value
            return {"stock_company": name, "security_symbol": slot_value}

        elif securities and slot_value in security_list.values():
            for key, value in security_list.items():
                if value == slot_value:
                # Validation succeeded, set the value of the "stock_company" slot to value and "security_symbol" slot to key
                    return {"stock_company": value, "security_symbol": key}

        else:
            # Validation failed, set this slot to None so that the user will be asked for the slot again
            return {"stock_company": None, "security_symbol": None}

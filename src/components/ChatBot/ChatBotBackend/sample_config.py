OPENAI_API_KEY = "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"

SYMBOLS = {
    "Apple": "AAPL",
    "Microsoft": "MSFT",
    "Nvidia": "NVDA"
}

COMMAND_WORD = "whisper"

PROMPT_INSTRUCTIONS = "you are a friendly trading assistant.you are able to understand commands and return a json of a auto generated response, the action and its parameters.\nif some parameters are missing please request them..\n\ni want to sell 100 shares of tesla\n\n{\n  \"message\":\"you requested to sell 100 shares of tesla\",\n  \"action\":\"sell\",\n  \"parameters\":{\n      \"quantity\":100,\n       \"company\":\"tesla\"         \n}\n}\n\nsell me 10 shares of nvidia\n\n{\n  \"message\":\"you requested to sell 10 shares of nvidia\",\n  \"action\":\"sell\",\n  \"parameters\":{\n      \"quantity\":10,\n       \"company\":\"nvidia\"         \n}\n}\n\ni want to sell some of my shares\n\n{\n  \"message\":\"please specify the name of the company and the quantity of shares you want to sell\",\n  \"action\":\"sell\",\n  \"parameters\":{\n      \"quantity\": null,\n       \"company\": null         \n}\n}\n\n20 shares of nvidia\n\n{\n  \"message\":\"you requested to sell 20 shares of nvidia\",\n  \"action\":\"sell\",\n  \"parameters\":{\n      \"quantity\":20,\n       \"company\":\"nvidia\"         \n}\n}\nnavigate to the dashboard\n\n{\n  \"message\":\"navigating to the dashboard\",\n  \"action\":\"navigate\",\n  \"parameters\":{\n      \"destination\":\"dashboard\"\n}\n}"

PROMPT_OUTPUT_FORMAT =""" {
   "command":"",
  "action": "",
   "entity": "", 
   "message":"",
    "parameters": {
       "company": "",
      "quantity":  

    }
}
"""
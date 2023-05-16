
# Start the Rasa actions server in the background
rasa run actions
# Wait for the actions server to start
sleep 10
# Start the Rasa API server
rasa run --enable-api

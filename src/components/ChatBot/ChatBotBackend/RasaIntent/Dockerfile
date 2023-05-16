# Use the official Rasa image as the base
FROM rasa/rasa:latest-full

# Set the working directory inside the container
WORKDIR /app

# Copy the project files to the container's working directory
COPY . /app

# Install additional dependencies, if any
# RUN pip install <dependency>

# Expose the desired port
EXPOSE 5005

# Train the Rasa model
RUN rasa train

# Start the actions server and enable the API
CMD bash -c "rasa run actions & rasa run --enable-api -p 5005 --cors * --debug"

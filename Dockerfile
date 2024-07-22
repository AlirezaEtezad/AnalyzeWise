# Use the official Python image from the Docker Hub
FROM python

# Set the working directory in the container
WORKDIR /myapp

# Copy the current directory contents into the container at /myapp
COPY . /myapp

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && apt-get clean

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Run the Flask app
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]

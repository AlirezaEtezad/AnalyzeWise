# Use the official Python image from the Docker Hub
FROM python

# Set the working directory in the container
WORKDIR /myapp

# Copy the current directory contents into the container at /myapp
COPY . /myapp

# Copy local Python packages from your machine into the Docker container
# COPY /home/ete/.local/lib/python3.12/site-packages /myapp/site-packages

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && apt-get clean



# Copy the .whl file for tensorflow (or other packages) into the container
COPY packages/tensorflow-2.17.0-cp312-cp312-manylinux_2_17_x86_64.manylinux2014_x86_64.whl /tmp/
COPY packages/tf_keras-2.17.0-py3-none-any.whl /tmp/

# Install Python dependencies
RUN pip install --no-cache-dir /tmp/tensorflow-2.17.0-cp312-cp312-manylinux_2_17_x86_64.manylinux2014_x86_64.whl
RUN pip install --no-cache-dir /tmp/tf_keras-2.17.0-py3-none-any.whl


# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

#Insatall from local 
# RUN pip install --no-index --find-links=/home/ete/.local/lib/python3.12/site-packages -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Run the Flask app
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]

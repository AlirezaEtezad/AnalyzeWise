FROM python

WORKDIR /myapp

COPY . /myapp

RUN pip install -r requirements.txt

CMD ["flask", "run", "--host", "0.0.0.0"]
# CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]
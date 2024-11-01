# AnalayzeWise
This is an analyzer web app powerd by Flask.


### Features:
- Finding your age using Deepface
- Calculating your BMR
- Posture detector using mediapipe
- Amazing Guess number

Note: You have to register and login to be able to use the features.

Public address:
```sh
analyzewise.liara.run
```
Local usage:

```sh
pip install -r requirements.txt
```

```sh
flask --run --debug
```

## Dockerized!!
You can also use it on docker due to your purposes.

make a docker image:
```sh
sudo docker build -t {name_of_image}
```
make a docker container from the image:
```sh
sudo docker run -p 5000:5000 --name {name_of_container} {name_of_image}
```


## Docker Network
You can also use a docekr network and run your app on 2 containers.

Create a Docker network
```sh
sudo docker network create my_network
```
Run PostgreSQL Docker container and connect it to the network
```sh
sudo docker run --network {network_name} --name {container_name} -e POSTGRES_PASSWORD={database_password} -e POSTGRES_USER={database_user} -e POSTGRES_DB={database_name} -d postgres
```
Run your Flask app Docker container and connect it to the network
```sh
sudo docker run --rm --network {network_name} --name {container_name} -p 8080:5000 -v $(pwd):/myapp {image_name}
```

## Docker Compose
For ease of use you can just modify a docker-compose.yml and just use the following commands:

create containers
```sh
sudo docker compose up -d
```
see the status of the containers
```sh
sudo docker compose ps
```
stop the containers
```sh
sudo docker compose stop
```
remove the containers
```sh
sudo docker compose down
```
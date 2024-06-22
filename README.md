# AnalayzeWise
This is an analyzer web app powerd by Flask.


### Features:
- Finding your age using Deepface
- Calculating yout BMR

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

# Example of Producer and Consumer with rabbitMQ

- this repository is for studying RabbitmMQ with docker;
- I created a docker-compose  with configurations do deploy a RabbitmMQ;
- so I a implemented a producer with nodejs to send messages to "exchanges" of RabbitmMQ and exchange send direct to "queue";
- then I a implemented a consumer for consume messages of queue;
- finally I created a dockerFile for this apps and add to my docker-compose;

****OBS**: to setup docker-compose environments need create file .env with the configurations;

---
## TODO: 

- implement other queue to reprocess failed messages;
- implement api to reprocess queue of failed messages;
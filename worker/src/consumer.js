var amqp = require('amqplib');
require('dotenv').config();

const consumer = async () => {

 
  const connection = await amqp.connect({
    hostname: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    protocol: process.env.RABBITMQ_PROTOCOL
  });

  const channel = await connection.createChannel();

  const queueName = process.env.RABBITMQ_QUEUE_NAME;

  const queue = await channel.assertQueue(queueName, {
    autoDelete: false,
    durable: true,
  });

  channel.prefetch(1);

  await channel.consume(queue.queue,
    async (msg) => {
      console.log(`[x] ${msg.fields.routingKey}: ${msg.content.toString()}`);
      channel.ack(msg);
    },
    {
      noAck: false,
    });
};

consumer();
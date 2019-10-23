const express = require('express');
const amqp = require('amqplib');

const route = express.Router();

const producer = async (req, res) => {

    const connection = await amqp.connect({
        hostname: process.env.RABBITMQ_HOST,
        port: process.env.RABBITMQ_PORT ,
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD,
        protocol: process.env.RABBITMQ_PROTOCOL
    });

    try {
        const max = new Number(req.query.max_items || 5000000) ;
        console.log("*****************"+ max);

        const channel = await connection.createChannel();

        const exchangeName = process.env.RABBITMQ_EXCHANGE_NAME;
        const queueName = process.env.RABBITMQ_QUEUE_NAME;
        const key =  process.env.RABBITMQ_ROUTE_KEY;
        const msg = "Hello World! It's work man!";

        const exchange = await channel.assertExchange(exchangeName, 'direct', {
            durable: true,
            autoDelete: false,
        });

        const queue = await channel.assertQueue(queueName, {
            autoDelete: false,
            durable: true,
        });

        await channel.bindQueue(queue.queue, exchange.exchange, key);

        for (let i = 0; i <= max; i++) {
            const published = channel.publish(exchange.exchange, key, Buffer.from(msg + i),
                {
                    persistent: true,
                    mandatory: true
                });
        }

        await channel.close();
        // console.log(`[x] Sent message with key ==> [${key}], message ==> [${msg}]`.yellow);
        res.status(200).send("message sended with sucessfull!");

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    } finally {
        connection.close();
    }
};

route.get('/producer', producer);

module.exports = route;
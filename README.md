# Rabbitmq-tuts (https://www.rabbitmq.com/getstarted.html)

This repository is all about experimenting and learning by doing stuff of RabbitMQ.

## Table of Contents

### `0. Hello World`

This is the example for simple hello world, just test the flow publisher to consumer

### `1. Pub/Sub`

Where publish will send the message to an exchanger, so the exchanger can send message to one or multiple queues,
then multiple consumer can consume the same message from the different queue.

### `2. Direct Exchange`

In this example we can add `binding key` to the `exchange` with the queue,
so that we can decide at the publishing time which queue should get the message from the `exchange` by the help the `routing key`.

### `3. Topic`

In this example we can use wildcard `*(one word)` or `#(one or multiple words)` for `binding key`,
so that we can map `queue and exchange` based on the wildcard. It should be separated by dot(.). Like: `socialmedia.*`, `#.log` etc

### `4. RPC`

In this example we can get result for the request was send from the publisher. So, while sending the request we will define the `replyTo` queue and `correlationId`,
so that `consumer/rpc` can reply back to that callback queue, `correlationId` is for matching the response because this ID will be generated for the endivitual publisher when it starts up.

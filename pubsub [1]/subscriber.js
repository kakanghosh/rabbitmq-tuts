const amqp = require('amqplib');

const task = { id: process.argv[2] };

(async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const exchangeName = 'logs';
  const assertExchange = await channel.assertExchange(exchangeName, 'fanout', {
    durable: false,
  });
  const assertQueue = await channel.assertQueue('', { exclusive: true });
  console.log(`Exchange ${assertExchange.exchange} Queue ${assertQueue.queue}`);
  await channel.bindQueue(assertQueue.queue, assertExchange.exchange, '');

  channel.consume(
    assertQueue.queue,
    (msg) => {
      const data = JSON.parse(msg.content);
      console.log(`Received`, data);
    },
    { noAck: true }
  );
})();

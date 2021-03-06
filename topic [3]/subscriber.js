const amqp = require('amqplib');

const savirity = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const exchangeName = 'logs';
  const assertExchange = await channel.assertExchange(exchangeName, 'topic', {
    durable: false,
  });
  const assertQueue = await channel.assertQueue('', { exclusive: true });
  console.log(`Exchange ${assertExchange.exchange} Queue ${assertQueue.queue}`);

  savirity.forEach(async (element) => {
    console.log(`Topic: ${element}`);
    await channel.bindQueue(
      assertQueue.queue,
      assertExchange.exchange,
      element
    );
  });

  channel.consume(
    assertQueue.queue,
    (msg) => {
      const data = JSON.parse(msg.content);
      console.log(`Received`, msg.fields, msg.properties, data);
    },
    { noAck: true }
  );
})();

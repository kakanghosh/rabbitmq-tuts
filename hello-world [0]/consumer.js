const amqp = require('amqplib');

(async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const queue = 'tasks';
  await channel.assertQueue(queue, { durable: true });
  channel.consume(
    queue,
    (message) => {
      console.log(message.properties.headers);
      const msg = JSON.parse(message.content.toString());
      console.log(`Received message ${msg.id}`);
      channel.ack(message);
    },
    { noAck: false }
  );
})();

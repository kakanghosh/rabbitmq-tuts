const amqp = require('amqplib');

(async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const queueName = 'rpc_queue';
  const message = process.argv[2];
  const correlationId = generateUuid();
  const assertQueue = await channel.assertQueue('', {
    exclusive: true,
  });
  console.log(`Reply to Queue: ${assertQueue.queue}`);
  channel.consume(
    assertQueue.queue,
    (msg) => {
      if (msg.properties.correlationId == correlationId) {
        const message = msg.content.toString();
        console.log(`Message Recieved: ${message}`);
        channel.ack(msg);
        channel.close();
        process.exit(0);
      }
    },
    {
      noAck: false,
    }
  );
  channel.sendToQueue(queueName, Buffer.from(message), {
    replyTo: assertQueue.queue,
    correlationId,
  });
})();

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}

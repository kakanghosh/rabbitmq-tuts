const amqp = require('amqplib');

(async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const queueName = 'rpc_queue';
  channel.prefetch(1);
  channel.assertQueue(queueName, {
    durable: false,
  });
  channel.consume(
    queueName,
    (msg) => {
      const number = +msg.content.toString();
      const replyTo = msg.properties.replyTo;
      const correlationId = msg.properties.correlationId;
      console.log(`Reply to Queue: ${replyTo}`);
      console.log(`Message Recieved: ${number}`);
      channel.sendToQueue(
        replyTo,
        Buffer.from(
          `Replied Back from RPC. Fibonacci of ${number} is ${fibonacci(
            number
          )}`
        ),
        {
          correlationId,
        }
      );
      channel.ack(msg);
    },
    {
      noAck: false,
    }
  );
})();

function fibonacci(n) {
  if (n == 0 || n == 1) return n;
  else return fibonacci(n - 1) + fibonacci(n - 2);
}

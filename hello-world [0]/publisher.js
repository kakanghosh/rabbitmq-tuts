const amqp = require('amqplib');

const task = { id: process.argv[2] };

(async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const queue = 'tasks';
  await channel.assertQueue(queue, { durable: true });
  setTimeout(() => {
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
      headers: {
        'x-data': 'hello',
      },
      persistent: true,
    });
  }, 100);

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
})();

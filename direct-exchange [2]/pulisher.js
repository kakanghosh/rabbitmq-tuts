const amqp = require('amqplib');

(async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const exchangeName = 'logs';
  const assertExchange = await channel.assertExchange(exchangeName, 'direct', {
    durable: false,
  });
  const routingKey = process.argv[2];
  const message = process.argv[3];
  const data = {
    data: `Send from publisher ${message}`,
  };
  channel.publish(
    assertExchange.exchange,
    routingKey,
    Buffer.from(JSON.stringify(data))
  );
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
})();

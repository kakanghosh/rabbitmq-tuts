const amqp = require('amqplib');

(async () => {
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();
  const exchangeName = 'logs';
  const assertExchange = await channel.assertExchange(exchangeName, 'fanout', {
    durable: false,
  });
  const data = {
    data: `Send from publisher ${process.argv[2]}`,
  };
  channel.publish(
    assertExchange.exchange,
    '',
    Buffer.from(JSON.stringify(data))
  );
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
})();

/*
orderResponseConsumer.js: For use in order service. Listens for order matching results from Matching Engine.
*/

// const { connectRabbitMQ } = require("./rabbitmq");
const amqp = require("amqplib");

const REQUEST_QUEUE = "MoneyToWallet";
const RESPONSE_QUEUE = "MoneyToWalletResponse";
const walletController = require("./controllers/walletController");


/**
 * Waits for an order response from the Matching Engine
 */
async function updateWalletAsync(timeout = 5000) {
  return new Promise(async (resolve) => {
    const connection = await amqp.connect({
                protocol: 'amqp',
                hostname: 'rabbitmq',
                port: 5672,
                username: 'admin',
                password: 'admin',
                vhost: '/'
            });

    const channel = await connection.createChannel();

     await channel.assertQueue(REQUEST_QUEUE, { durable: true });
    // await channel.assertQueue(RESPONSE_QUEUE, { durable: true });

    // const timeoutId = setTimeout(() => {
    //   console.log(`Timeout waiting for update wallet}`);
    //   resolve(null);
    // }, timeout);

    channel.consume(
      REQUEST_QUEUE,
      async (msg) => {
        if (msg !== null) {
          const response = JSON.parse(msg.content.toString());

          console.log("Received update wallet request", response);
          const data = await walletController.updateWallet(response);
          console.log("Data successful", data);
          if (data !== null) {
            channel.ack(msg);
            resolve(response);
          } else {
            console.log("Failed to update wallet");
          }
        //   clearTimeout(timeoutId);
          
          //   if (response.stock_tx_id === null) {
          //     clearTimeout(timeoutId);
          //     channel.ack(msg);
          //     resolve(response);
          //   } else {
          //     channel.nack(msg, false, true); // Put back if not the right order
          //   }
        }
      },
      { noAck: false }
    );
  });
}

module.exports = { updateWalletAsync };

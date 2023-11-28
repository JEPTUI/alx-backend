import redis from 'redis';

// Create a Redis subscriber client
const subscriberClient = redis.createClient();

// Event handler for successful connection
subscriberClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection error
subscriberClient.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the "holberton school channel"
const channel = 'holberton school channel';
subscriberClient.subscribe(channel);

// Event handler for messages received on the subscribed channel
subscriberClient.on('message', (subscribedChannel, message) => {
  console.log(`${message}`);

  // Unsubscribe and quit if the message is "KILL_SERVER"
  if (message === 'KILL_SERVER') {
    subscriberClient.unsubscribe();
    subscriberClient.quit();
  }
});

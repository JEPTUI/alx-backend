import redis from 'redis';

// Create a Redis publisher client
const publisherClient = redis.createClient();

// Event handler for successful connection
publisherClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection error
publisherClient.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to publish a message after a specified time
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send "${message}"`);
    publisherClient.publish('holberton school channel', message);
  }, time);
}

// Call the publishMessage function for various messages and times
publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);

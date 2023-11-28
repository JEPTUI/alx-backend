import redis from 'redis';

// Create redis client
const client = redis.createClient();

// Event handler for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection error
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to create a hash using hset
function createHash() {
  const hashKey = 'HolbertonSchools';

  client.hset(hashKey, 'Portland', 50, redis.print);
  client.hset(hashKey, 'Seattle', 80, redis.print);
  client.hset(hashKey, 'New York', 20, redis.print);
  client.hset(hashKey, 'Bogota', 20, redis.print);
  client.hset(hashKey, 'Cali', 40, redis.print);
  client.hset(hashKey, 'Paris', 2, redis.print);
}

// Function to display the hash using hgetall
function displayHash() {
  const hashKey = 'HolbertonSchools';

  // Use hgetall to retrieve the entire hash
  client.hgetall(hashKey, (err, result) => {
    if (err) {
      console.error(`Error getting hash values: ${err.message}`);
    } else {
      console.log(result);
    }

    client.quit();
  });
}

// Call the functions
createHash();
displayHash();

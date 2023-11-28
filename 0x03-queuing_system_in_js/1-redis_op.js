import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Event handler for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection error
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school value in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

// Function to display the value for a given school key
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, value) => {
    if (err) {
      console.error(`Error getting value for key ${schoolName}: ${err.message}`);
    } else {
      console.log(`${value}`);
    }
  });
}

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

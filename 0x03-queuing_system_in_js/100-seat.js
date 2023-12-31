import express from 'express';
import redis from 'redis';
import kue from 'kue';
import { promisify } from 'util';

const app = express();
const port = 1245;
const queue = kue.createQueue();

const client = redis.createClient();

// Promisify Redis functions
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize the number of available seats
const initialAvailableSeats = 50;
let reservationEnabled = true;

// Function to reserve seat in Redis
const reserveSeat = async (number) => {
  await setAsync('available_seats', number);
};

// Function to get current available seats from Redis
const getCurrentAvailableSeats = async () => {
  const numberOfAvailableSeats = await getAsync('available_seats');
  return numberOfAvailableSeats ? parseInt(numberOfAvailableSeats) : 0;
};

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      res.json({ status: 'Reservation failed' });
    } else {
      res.json({ status: 'Reservation in process' });
    }
  });
});

// Route to process the queue and decrease available seats
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  // Process the queue reserve_seat
  queue.process('reserve_seat', async (job, done) => {
    try {
      const currentAvailableSeats = await getCurrentAvailableSeats();
      if (currentAvailableSeats <= 0) {
        reservationEnabled = false;
        done(new Error('Not enough seats available'));
      } else {
        await reserveSeat(currentAvailableSeats - 1);
        if (currentAvailableSeats - 1 === 0) {
          reservationEnabled = false;
        }
        done();
      }
    } catch (error) {
      done(error);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

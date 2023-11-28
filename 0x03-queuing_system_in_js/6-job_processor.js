import kue from 'kue';

// Create a Kue queue named 'push_notification_code'
const queue = kue.createQueue();

// Function to send a notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  // Extract phone number and message from job data
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function
  sendNotification(phoneNumber, message);

  // Notify Kue that the job is done
  done();
});

// Event handler for queue errors
queue.on('error', (err) => {
  console.error(`Queue error: ${err.message}`);
});

console.log('Job processor is running...');

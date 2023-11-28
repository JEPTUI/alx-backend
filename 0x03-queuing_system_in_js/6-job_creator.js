import kue from 'kue';

// Create a Kue queue named 'push_notification_code'
const queue = kue.createQueue();

// Create an object containing the Job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'This is a test notification message',
};

// Create a job and add it to the queue
const notificationJob = queue.create('push_notification_code', jobData);

// Event handler for successful job creation
notificationJob.on('complete', () => {
  console.log('Notification job completed');
  // Quit the queue to ensure that the process can exit
  queue.shutdown(5000, (err) => {
    console.log('Kue has shut down.');
    process.exit(err ? 1 : 0);
  });
});

// Event handler for failed job
notificationJob.on('failed', () => {
  console.error('Notification job failed');
  // Quit the queue to ensure that the process can exit
  queue.shutdown(5000, (err) => {
    console.log('Kue has shut down.');
    process.exit(err ? 1 : 0);
  });
});

// Save the job to the queue
notificationJob.save((err) => {
  if (!err) {
    console.log(`Notification job created: ${notificationJob.id}`);
  } else {
    console.error(`Error creating notification job: ${err.message}`);
    // Quit the queue to ensure that the process can exit
    queue.shutdown(5000, (shutdownErr) => {
      console.log('Kue has shut down.');
      process.exit(shutdownErr ? 1 : 0);
    });
  }
});

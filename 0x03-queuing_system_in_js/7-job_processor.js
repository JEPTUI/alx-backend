import kue from 'kue';

// create an array of blacklisted numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// create a Kue queue
const queue = kue.createQueue({ concurrency: 2 });

// function to send notification
function sendNotification(phoneNumber, message, job, done) {
  // track job progress
  job.progress(0, 100);

  // Check if phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
    done(error);
  } else {
    // track job progress to 50%
    job.progress(50, 100);

    // send notification to console
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    setTimeout(() => {
      // mark job as completed
      done();
    }, 1000);
  }
}

// process jobs
queue.process('push_notification_code_2', 2, (job, done) => {
  // extract phone number and message
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

// Event handler for queue errors
queue.on('error', (err) => {
  console.error(`Queue error: ${err.message}`);
});

console.log('Job processor is running...');

import kue from 'kue';

const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// Create a Kue queue named 'push_notification_code'
const queue = kue.createQueue();

// process each job
jobs.forEach((jobData) => {
	const notificationJob = queue.create('push_notification_code_2', jobData);

	// Event handler for successful job creation
	notificationJob.on('complete', () => {
		console.log(`Notification job ${notificationJob.id} completed`);
	});

	// Event handler for failed job creation
	notificationJob.on('failed', (err) => {
		console.error(`Notification job ${notificationJob.id} failed: ${err}`);
	});

	// Event handler for job progress
	notificationJob.on('progress', (progress) => {
		console.log(`Notification job ${notificationJob.id} ${progress}% complete`);
	});

	// save job to the queue
	notificationJob.save((err) => {
		if (!err) {
			console.log(`Notification job created: ${notificationJob.id}`);
		} else {
			console.error(`Error creating notification job: ${err.message}`);
		}
	});
});

console.log('Job creator is running...');

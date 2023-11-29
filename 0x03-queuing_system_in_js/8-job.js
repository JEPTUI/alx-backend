function createPushNotificationsJobs(jobs, queue) {
  // check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // process each job in the array
  jobs.forEach((jobData) => {
    const notificationJob = queue.create('push_notification_code_3', jobData);

    // Event handler for successful job creation
    notificationJob.on('complete', () => {
      console.log(`Notification job ${notificationJob.id} completed`);
    });

    // Event handler for failed job
    notificationJob.on('failed', (err) => {
      console.error(`Notification job ${notificationJob.id} failed: ${err}`);
    });

    // Event handler for job progress
    notificationJob.on('progress', (progress) => {
      console.log(`Notification job ${notificationJob.id} ${progress}% complete`);
    });

    // Save the job to the queue
    notificationJob.save((err) => {
      if (!err) {
        console.log(`Notification job created: ${notificationJob.id}`);
      } else {
        console.error(`Error creating notification job: ${err.message}`);
      }
    });
  });
}

export default createPushNotificationsJobs;

import kue from 'kue';
import chai from 'chai';
import createPushNotificationsJobs from './8-job.js';

const { expect } = chai;

describe('createPushNotificationsJobs', () => {
  let queue;

  // Set up a Kue queue and enter test mode
  beforeEach(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  // Clear the queue and exit test mode
  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not_an_array', queue)).toThrow('Jobs is not an array');
  });

  it('should create jobs in the queue and log appropriate messages', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Assert that jobs are created in the queue
    expect(queue.testMode.jobs).toHaveLength(jobs.length);

    // Assert that appropriate messages are logged
    jobs.forEach((jobData) => {
      const job = queue.testMode.jobs.find((j) => j.type === 'push_notification_code_3');
      expect(console.log).toHaveBeenCalledWith(`Notification job created: ${job.id}`);
    });
  });
});

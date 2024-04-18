import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';
import { runClient } from './client';
import { NAMESPACE, TASK_QUEUE } from './constants';

async function run() {
  const connection = await NativeConnection.connect({
    address: 'localhost:7255',
  });
  const worker = await Worker.create({
    connection,
    namespace: NAMESPACE,
    taskQueue: TASK_QUEUE,
    workflowsPath: require.resolve('./workflows'),
    activities,
  });
  runClient().catch((err) => {
    console.log('Error in starting application', err.message);

    console.error(err);
    process.exit(1);
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

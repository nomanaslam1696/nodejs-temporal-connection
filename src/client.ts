import * as workflows from './workflows';
import { WorkflowClient } from '@temporalio/client';
import express from 'express';
import { PORT, TASK_QUEUE } from './constants';
import { createExpressMiddleware } from './express.routes';
import { connection } from './db.connection';


export async function runClient() {
  const client = new WorkflowClient();

  const app = express();
  app.use(createExpressMiddleware(workflows, client, TASK_QUEUE));
  app.listen(PORT);
  console.log(`Listening on port ${PORT}`);

  connection.connect(function (err: any) {
    if (err) {
      console.log('error occurred while connecting', err.message);
    } else {
      console.log('connection created with Mysql successfully');
    }
  });
}

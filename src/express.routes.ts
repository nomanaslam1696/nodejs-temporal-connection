import { WorkflowClient } from '@temporalio/client';
import express, { Router } from 'express';
import { v4 } from 'uuid';
import { MAXIMUM_ATTEMPTS_ALLOWED } from './constants';

export function createExpressMiddleware(workflows: any, client: WorkflowClient, taskQueue: string, router?: Router) {
  if (router === undefined) {
    router = Router();
  }

  router.post(`/workflow/:name`,express.json(), function (req: express.Request, res: express.Response) {
    const { name } = req.params;
    
    const workflowId = v4();
    const opts = {
      taskQueue,
      workflowId,
      args: [req.body],
      retry: {
        maximumAttempts: MAXIMUM_ATTEMPTS_ALLOWED,
      },
    };
    client.start(name, opts).then(() => res.json({ workflowId }));
  });

  router.post(`/workflow/:workflowId/terminate`,express.json(), function (req: express.Request, res: express.Response) {
    const { workflowId } = req.params;
    terminateWorkflow(client, workflowId)
      .then(() => {
        res.json({ workflowId });
      })
      .catch((error) => {
        res.json(`${workflowId} already Terminated`);
      });
  });
  return router;
}

async function terminateWorkflow(client: WorkflowClient, workflowId: string) {
  const handle = client.getHandle(workflowId);
  await handle.terminate().then(() => {
    console.log(`${workflowId} terminated successfully`);
  });
}

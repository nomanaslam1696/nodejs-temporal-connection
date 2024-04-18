# nodejs-temporal-connection

### Running this sample

1. `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow Client.

workflow execution API should have the body in format of array of objects
for example...

{
"tasks" : [
{
"type" : "email",
"email" : "hell@gmail.com"
},
{
"type" : "delay",
"delay" : "100000"
},
{
"type" : "sms",
"phone" : "03218989889"
}
],
"site_id" : "abcd",
"subscriber_id" : "00047436-61b3-4e6c-a83c-176cee5d58ac"
}

### Workflow Management with Temporal

Temporal is a workflow orchestration platform that enables developers to easily manage and execute complex workflows. This document provides guidance on starting and terminating workflows using Temporal, along with accessing workflow information through the Temporal web UI.

### Starting a New Workflow

To initiate a new workflow, use the following path:
http://localhost:4300/workflow/name
Replace `name` in the path with the specific workflow name. For example, to start a workflow named "CommunicationChannelFlow," use the path:
http://localhost:4300/workflow/CommunicationChannelFlow

### Terminating a Running Workflow

To terminate a running workflow, utilize the following path:
http://localhost:4300/workflow/workflow-id/terminate

Upon initiating the request to start a new workflow, you will receive the workflow-id in the response. Alternatively, you can also retrieve the workflow-id from the Temporal web UI accessible at:
http://localhost:8233

Temporal web UI shows all the workflows with their information like status, workflow-id, start-time etc.

###

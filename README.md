# nodejs-temporal-connection


### Running this sample

1. `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow Client.

The Workflow should return:

```bash
Hello, Temporal!
```

workflow execution API should have the body in format of array of objects
for example...

 {
  "tasks" :  [
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

import * as workflow from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { ApplicationFailure, sleep } from '@temporalio/workflow';
import { userData } from './shared';

const { sendEmail, sendSms, sendNotification, addUserToDb,removeUser } = workflow.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});
export async function example(dataObj: userData): Promise<string> {
  
  await addUserToDb(dataObj.subscriber_id);

  const data = dataObj.tasks;
  for (let i = 0; i < data.length; i++) {
    const dataObj = data[i];
    const type = dataObj.type;
    if (type == 'sms') {
      try {
        await sendSms(dataObj.phone);
      } catch (error) {
        throw new ApplicationFailure(`sms sending failed. Error: ${error}`);
      }
    } else if (type == 'email') {
      try {
        await sendEmail(dataObj.email);
      } catch (error) {
        throw new ApplicationFailure(`email sending failed. Error: ${error}`);
      }
    } else if (type == 'notification') {
      try {
        await sendNotification(dataObj.email);
      } catch (error) {
        throw new ApplicationFailure(`notification sending failed. Error: ${error}`);
      }
    } else if (type == 'delay') {
      try {
        console.log('slept');
        await sleep(dataObj.delay);
        console.log('ready');
      } catch (error) {
        throw new ApplicationFailure(`error in delaying workflow. Error: ${error}`);
      }
    } else {
      throw new ApplicationFailure(`your type is not well defined`);
    }
  }
    await removeUser(dataObj.subscriber_id)

  return 'workflow executed successfully';
}

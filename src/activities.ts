import { ApplicationFailure } from '@temporalio/workflow';
import { connection } from './db.connection';
import { v4 as uuid } from 'uuid';

export async function greet(name: string): Promise<string> {
  console.log(`hello ${name}`);

  return `Hello, ${name}!`;
}

export async function sendEmail(email: string) {
  console.log(`email sent to ${email}`);
  return `email sent to ${email}`;
}

export async function sendSms(phone: string) {
  console.log(`message sent to ${phone}`);
  return `message sent to ${phone}`;
}

export async function sendNotification(email: string) {
  console.log(`notification sent to ${email}`);
  return `notification sent to ${email}`;
}

export async function addUserToDb(subscriber_id: string) {
  const query = `INSERT INTO Workflow  
  (id,subscriber_id) VALUES (?,?);`;
  await connection.query(query, [uuid(), subscriber_id], function (err: any, result: any) {
    if (err) {
      throw new ApplicationFailure(`error in adding subscriber: ${err}`);
    } else {
      console.log('workflow created successfully', result.affectedRows);
    }
  });
}

export async function removeUser(subscriber_id: string) {
  const query = 'DELETE FROM Workflow WHERE subscriber_id = ?';
  await connection.query(query, subscriber_id, function (err: any, result: any) {
    if (err) {
      throw new ApplicationFailure(`error in deleting subscriber: ${err}`);
    } else {
      console.log('workflow deleted successfully', result.affectedRows);
    }
  });
}

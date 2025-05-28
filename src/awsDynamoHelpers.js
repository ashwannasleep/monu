import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';

export async function saveUserData(item) {
  const credentials = await Auth.currentCredentials();
  const dynamodb = new AWS.DynamoDB.DocumentClient({
    credentials: Auth.essentialCredentials(credentials),
    region: 'us-east-1',
  });

  const user = await Auth.currentUserInfo();

  const params = {
    TableName: 'MonuUserData',
    Item: {
      userId: user.attributes.sub,
      itemId: item.id,
      data: item,
    },
  };

  await dynamodb.put(params).promise();
}

const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();


exports.handler = async () => {

  let responseBody = "";
  let statusCode = 0;
  let headers = '';

  const params = {
    TableName: 'visitorCounter',
    Key: {
      count: 'totalVisitors'
    },
    UpdateExpression: "SET numberOfVisitors = if_not_exists(numberOfVisitors, :initial) + :inc",
    ExpressionAttributeValues: {
      ":initial": 0,
      ":inc": 1,
    },
    ReturnValues: "UPDATED_NEW"
  };


  try {
    const data = await dynamo.update(params).promise();

    statusCode = 200;
    headers = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "https://marikabergman.com",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,"
    };
    responseBody = JSON.stringify(data);

  } catch (err) {
    responseBody = `Unable to update Item ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: headers,
    body: responseBody
  };

  return response;

};
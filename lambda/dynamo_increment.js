const AWS = require("aws-sdk"); // is this needed here?

const dynamo = new AWS.DynamoDB.DocumentClient(); // is this needed here?


exports.handler = async (event, context) => {

  let responseBody = "";
  let statusCode = 0;
  let headers = '';

  const params = {
    TableName: 'visitorCount',
    Key: {
      count: 'totalVisitors'
    },
    UpdateExpression: "SET numberOfVisitors = numberOfVisitors + :inc",
    ExpressionAttributeValues: { ":inc": 1 },
    ReturnValues: "UPDATED_NEW"
  };


  try {
    const data = await dynamo.update(params).promise();

    statusCode = 200;
    headers = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "https://d2000v0om9ep85.cloudfront.net",
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
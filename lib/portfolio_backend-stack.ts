import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class PortfolioBackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const visitorCount = new lambda.Function(this, 'VisitorCountHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'dynamo_increment.handler'
    })
    //TODO should I change here the Lambda role so that it is able to update the DynamoDB table?

  //TODO this is where api gateway must be added, however tutorial is for rest api instead of http api

  }
}

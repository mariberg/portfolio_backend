import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaToDynamoDBProps, LambdaToDynamoDB} from '@aws-solutions-constructs/aws-lambda-dynamodb';
import * as apigw from 'aws-cdk-lib/aws-apigateway';  
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';

export class PortfolioBackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    
    // Lambda to Dynamo solutions construct
    const lambdaToDynamo: LambdaToDynamoDBProps = {
      lambdaFunctionProps: {
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'dynamo_increment.handler',
      },

      dynamoTableProps: {
        tableName: 'visitorCounter', // forcing tableName to be visitorCount to match the lambda function
        partitionKey: { 
          name: 'count',
          type: AttributeType.STRING
        },

      } 
    };

    const lambdaToDyn = new LambdaToDynamoDB(this, 'visitorCounter', lambdaToDynamo);
  
    
    const api = new apigw.LambdaRestApi(this, 'portfolio_api', {
      handler: lambdaToDyn.lambdaFunction,
      proxy: false,
     defaultCorsPreflightOptions: {
      allowHeaders:[
        'Content-Type'
      ],
      allowMethods: ['OPTIONS', 'POST'],
      allowOrigins: ['https://marikabergman.com'],
     },
    })

  
    api.root.addMethod('POST'); 

    
    api.addUsagePlan('UsagePlan', {
        throttle: {
        rateLimit: 50,
        burstLimit: 20
      }
    })

  }
}

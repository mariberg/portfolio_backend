import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaToDynamoDBProps, LambdaToDynamoDB} from '@aws-solutions-constructs/aws-lambda-dynamodb';
import * as apigw from 'aws-cdk-lib/aws-apigateway';  //this is rest api gw????
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'; //? is this needed?
//import * as apigw from 'aws-cdk-lib/aws-apigatewayv2';
import { AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { Cors } from 'aws-cdk-lib/aws-apigateway';

export class PortfolioBackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


// https://docs.aws.amazon.com/solutions/latest/constructs/walkthrough-part-2-v2.html
    const addVisitor = new lambda.Function(this, 'addVisitorHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'dynamo_increment.handler',
    });

    // defines an AWS Lambda resource
    const lambdaToDynamo: LambdaToDynamoDBProps = {
      lambdaFunctionProps: { // User provided props to override the default props for the Lambda function
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset('lambda'),
        handler: 'dynamo_increment.handler',
      },
      tablePermissions: 'ReadWrite', // Lambda allowed to read and write
      dynamoTableProps: {
        tableName: 'visitorCount', // forcing tableName to be visitorCount to match the lambda function
        partitionKey: { 
          name: 'count',
          type: AttributeType.STRING
        },

      } //Optional user provided props to override the default props for DynamoDB Table
      // default option is to the the billing mode for DynamoDB to on-demand
    };

    new LambdaToDynamoDB(this, 'visitorCounter', lambdaToDynamo);

  
    const api = new apigw.LambdaRestApi(this, 'portfolio_api', {
      handler: addVisitor,
      proxy: false,
     //? integrationOptions: i guess nothing needed here?
     defaultCorsPreflightOptions: {
      allowOrigins: Cors.ALL_ORIGINS, //! change here 
     }
    })

    // methods that are used
    api.root.addMethod('POST'); //? is options needed?

    //! should I add stages?
    
    api.addUsagePlan('UsagePlan', {
      throttle: {
        rateLimit: 50,
        burstLimit: 20
      }
    })

  }
}

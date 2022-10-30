# Cloud Resume Challenge - backend for my portfolio site

This project has been greated based on the [Cloud Resume Challenge](https://cloudresumechallenge.dev/), which gives a roadmap for creating a fullstack project with AWS, with plenty of opportunities for choosing your own path along the way. 

My backend consists of AWS API Gateway that sits between the client and backend services. The API Gateway accesses Lambda function, which 
updates a DynamoDB visitor counter table.  Each HTTP request increments the visitor counter and an updated value is then returned to the client through Lambda and API Gateway.

The project as been deployed as infrastructed-as-code (IaC) and the tool that has been used for that is AWS CDK (Cloud development kit). Open-source extension of the AWS SDK, called AWS Solution Constructs has been used for the Lambda to Dynamo pattern. 

Deployment has been automated with Github Actions workflow, which zips the Lambda function, installs dependencies, configures AWS credentials with OIDC, deploys CDK stack and runs Cypress tests.





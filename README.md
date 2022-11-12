# Cloud Resume Challenge - backend for my portfolio site

This project has been created based on the [Cloud Resume Challenge](https://cloudresumechallenge.dev/), which gives a roadmap for creating a fullstack project with AWS, with plenty of opportunities for choosing your own path along the way. 

The frontend for the project can be found in this [repo](https://github.com/mariberg/portfolio_frontend). My deployed portfolio site is [here](https://marikabergman.com).


## Project structure

The backend consists of AWS API Gateway that sits between the client and backend services. The API Gateway accesses Lambda function, which 
updates a DynamoDB visitor counter table.  Each HTTP request increments the visitor counter and an updated value is then returned to the client through Lambda and API Gateway.

## Deployment

The project as been deployed as infrastructe-as-code (IaC) and the tool that has been used for that is AWS CDK (Cloud development kit). Open-source extension of AWS CDK, called AWS Solution Constructs has been used for the Lambda to Dynamo pattern. This repo includes the CDK app source code.

## CI/CD

Deployment has been automated with Github Actions workflow, which zips the Lambda function, installs dependencies, configures AWS credentials with OIDC, deploys CDK stack and runs Cypress tests.





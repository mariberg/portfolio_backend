#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PortfolioBackendStack } from '../lib/portfolio_backend-stack';

const app = new cdk.App();
new PortfolioBackendStack(app, 'PortfolioBackendStack');

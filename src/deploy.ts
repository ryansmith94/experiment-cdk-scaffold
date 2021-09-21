// npx ts-node src/deploy.ts
import * as cdk from '@aws-cdk/core';
import { ServiceStack } from './service/service.cdk';

const scope = new cdk.App();
new ServiceStack(scope, 'example');

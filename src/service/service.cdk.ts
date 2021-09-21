import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { serviceDistFolderPath, serviceName } from './service.build';

export class ServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, `${id}-lambda`, {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(serviceDistFolderPath),
      handler: `${serviceName}.handler`,
    });

    // https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html
    const api = new RestApi(this, `${id}-api`);
    const serviceIntegration = new LambdaIntegration(lambda);
    const resource = api.root.addResource('service');
    resource.addMethod('GET', serviceIntegration);
  }
}

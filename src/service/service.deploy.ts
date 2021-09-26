import { Construct } from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import * as esbuild from 'esbuild';

export const serviceName = 'service';
export const serviceSrcFilePath = `${__dirname}/${serviceName}.api.ts`;
export const serviceDistFolderPath = `${__dirname}/dist`;
export const serviceDistFilePath = `${serviceDistFolderPath}/${serviceName}.js`;

export async function deployService() {
  await esbuild.build({
    entryPoints: [serviceSrcFilePath],
    bundle: true,
    outfile: serviceDistFilePath,
    platform: 'node',
  });

  return (scope: Construct) => {
    const lambda = new Function(scope, 'lambda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(serviceDistFolderPath),
      handler: `${serviceName}.handler`,
    });

    // https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html
    const api = new RestApi(scope, 'api');
    const serviceIntegration = new LambdaIntegration(lambda);
    const resource = api.root.addResource('service');
    resource.addMethod('GET', serviceIntegration);
  };
}

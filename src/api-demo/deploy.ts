import { Construct } from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import * as esbuild from 'esbuild';

export async function createApiLambdaConstructor(lambdaName: string) {
  const fileName = 'api';
  const serviceSrcFilePath = `${__dirname}/${fileName}.ts`;
  const serviceDistFolderPath = `${__dirname}/dist`;
  const serviceDistFilePath = `${serviceDistFolderPath}/${fileName}.js`;

  await esbuild.build({
    entryPoints: [serviceSrcFilePath],
    bundle: true,
    outfile: serviceDistFilePath,
    platform: 'node',
  });

  return (scope: Construct) => {
    const lambda = new Function(scope, lambdaName, {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(serviceDistFolderPath),
      handler: `${fileName}.handler`,
    });

    return new LambdaIntegration(lambda);
  };
}

export async function createApiDemoConstructor() {
  const resourceName = 'api-demo';
  const lambdaName = `${resourceName}-get-lambda`;
  const constructApiLambda = await createApiLambdaConstructor(lambdaName);

  return (scope: Construct) => {
    const serviceIntegration = constructApiLambda(scope);
    const api = new RestApi(scope, `${resourceName}-api`);
    const resource = api.root.addResource(resourceName);
    resource.addMethod('GET', serviceIntegration);
  };
}

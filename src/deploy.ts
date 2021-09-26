// npx ts-node src/deploy.ts
import * as cdk from '@aws-cdk/core';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { createApiDemoConstructor } from './api-demo/deploy';

async function main() {
  const scope = new cdk.App();
  const constructApiDemo = await createApiDemoConstructor();
  class AppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);
      constructApiDemo(this);
    }
  }

  new AppStack(scope, 'example');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

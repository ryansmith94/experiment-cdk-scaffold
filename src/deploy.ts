// npx ts-node src/deploy.ts
import * as cdk from '@aws-cdk/core';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { createServiceConstructor } from './service/deploy';

async function main() {
  const scope = new cdk.App();
  const constructService = await createServiceConstructor();
  class ServiceStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);
      constructService(this);
    }
  }

  new ServiceStack(scope, 'example');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

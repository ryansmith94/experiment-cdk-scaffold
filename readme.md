# Template Experiment

1. Install dependencies with `npm ci`
1. Build the code with `npm run build`
1. Configure AWS with `aws configure` (a SysAdmin can help here)
1. Bootstrap the CDK with `npm run bootstrap aws://{ACCOUNT_ID}/{REGION}` (a SysAdmin can help here)
1. Synthesize the CDK with `npm run synth`
1. Deploy the code with `npm run deploy`
1. You'll then get an endpoint to hit, just append `/service` and open in your browser
1. It should say "hello"

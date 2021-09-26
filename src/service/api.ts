import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

// https://github.com/HT2-Labs/ll-connectors/blob/master/src/utils/createGatewayHandler.ts
export const handler: APIGatewayProxyHandlerV2 = async () => {
  return {
    statusCode: 200,
    body: 'hello',
  };
};

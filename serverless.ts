import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'api-blueprint',
  frameworkVersion: '2',
  useDotenv: true,
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    // @ts-expect-error https://github.com/serverless/typescript/issues/11
    region: "${opt:region, 'us-east-1'}",
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      minimumCompressionSize: 1024, // Enable gzip compression for responses > 1 KB
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  custom: {
    'serverless-offline': {
      port: 3000,
    },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },

  functions: {
    hello: {
      handler: 'src/handlers/hello.handler',
      events: [
        {
          http: {
            method: 'get',
            path: '/',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;

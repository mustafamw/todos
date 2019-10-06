import { Environment } from 'src/app/interfaces/environment';

export const environment: Environment = {
  production: false,
  api: {
    domain: 'http://localhost:3000',
    path: '/api/v1'
  }
};
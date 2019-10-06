import { Environment } from 'src/app/interfaces/environment';

export const environment: Environment = {
  production: true,
  api: {
    domain: 'localhost:3000',
    path: '/api/v1/todos'
  }
};

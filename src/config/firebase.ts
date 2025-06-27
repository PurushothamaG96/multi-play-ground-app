import { initializeApp, cert, App, ServiceAccount } from 'firebase-admin/app';

const app = (config: ServiceAccount | string): App =>
  initializeApp({
    credential: cert(config),
    databaseURL: undefined,
  });

export default app;

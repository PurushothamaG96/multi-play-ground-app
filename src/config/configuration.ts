import { IFirebase, ISystemConfig } from '../interfaces/system';

export default (): ISystemConfig => {
  const firebase = JSON.parse(
    Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT as string,
      'base64',
    ).toString('utf8'),
  ) as IFirebase;

  return {
    firebase,
    databaseUrl: process.env.DATABASE_URL as string,
  };
};

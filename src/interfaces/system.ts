export interface IFirebase {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export interface ISystemConfig {
  firebase: IFirebase;
  databaseUrl: string;
}

export interface IExceptionPayload {
  message: string;
  stack?: any;
  data?: any;
  metadata?: any;
  [key: string]: unknown;
}

export enum PARENT_RELATION {
  FATHER = 'father',
  MOTHER = 'mother',
  GUARDIAN = 'guardian',
}

export enum GENDER {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

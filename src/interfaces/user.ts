export enum USER_TYPE {
  ADMIN = 1,
  PRINCIPAL = 2,
  TEACHER = 3,
  STUDENT = 4,
  PARENT = 5,
  LIBRARIAN = 6,
  ACCOUNTANT = 7,
  STAFF = 8,
  NOT_DEFINED_YET = 9,
}

export const USER_TYPE_NAME: Record<USER_TYPE, string> = {
  [USER_TYPE.ADMIN]: 'Admin',
  [USER_TYPE.PRINCIPAL]: 'Principal',
  [USER_TYPE.TEACHER]: 'Teacher',
  [USER_TYPE.STUDENT]: 'Student',
  [USER_TYPE.PARENT]: 'Parent',
  [USER_TYPE.LIBRARIAN]: 'Librarian',
  [USER_TYPE.ACCOUNTANT]: 'Accountant',
  [USER_TYPE.STAFF]: 'Staff',
  [USER_TYPE.NOT_DEFINED_YET]: 'Not defined',
};

export enum FormMode {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  REGISTER = 'REGISTER'
}

export interface ButtonConfig {
  action: {
    color: string;
    text: string;
  };
  cancel?: {
    color: string;
    text: string;
  };
}

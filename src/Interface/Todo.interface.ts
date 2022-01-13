export interface Todo {
  title: string;
  completed: boolean;
  objectId?:string;
}

export interface User {
  name: string;
  email :string;
  password: string;
}

export interface CurrentUser {
  objectId:     string;
  username:     string;
  email:        string;
  createdAt:    Date;
  updatedAt:    Date;
  ACL:          any;
  sessionToken: string;
}

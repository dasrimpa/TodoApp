export interface Todo {
  title: string;
  completed: boolean;
  objectId?:string;
}

export interface User{
  name: string;
  email :string;
  password: string;
}
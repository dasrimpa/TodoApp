export interface CurrentUser {
  objectId:     string;
  username:     string;
  email:        string;
  createdAt:    Date;
  updatedAt:    Date;
  ACL:          any;
  sessionToken: string;
}
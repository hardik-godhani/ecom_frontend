export interface User {
  id: number;
  email: string;
  fname: string;
  lname: string;
  phone: string;
  role: string;
  token: string;
  isDeleted: boolean;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

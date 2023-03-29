export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  token: string;
  isDeleted: boolean;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

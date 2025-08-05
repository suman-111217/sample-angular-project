export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  status: number;
  data: User[] | User;
  message: string;
} 
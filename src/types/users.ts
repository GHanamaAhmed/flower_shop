export interface UsersTableData {
  id: string;
  n: number;
  purchases: number;
  email: string;
  returned: number;
  name: string;
  amount: number;
}
export enum UserRoles {
  admin = "admin",
  user = "user",
}

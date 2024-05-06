import { ActivityResponse } from './activity.model';

export interface EmployeeResponse {
  id: number;
  username: string;
  fullname: string;
  rate?: string;
  token?: string;
  created_at: string;
  updated_at: string;
  activities?: ActivityResponse[];
}

export interface RegisterEmployeeRequest {
  username: string;
  fullname: string;
  password: string;
}

export interface LoginEmployeeRequest {
  username: string;
  password: string;
}

export class UpdateEmployeeRequest {
  fullname: string;
  password: string;
  rate?: string;
}

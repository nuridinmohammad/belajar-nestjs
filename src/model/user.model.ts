export interface UserResponse {
  username: string;
  fullname: string;
  created_at?: string;
  updated_at?: string;
  token?: string;
}

export interface RegisterUserRequest {
  username: string;
  fullname: string;
  password: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

export class UpdateUserRequest {
  fullname?: string;
  password?: string;
}

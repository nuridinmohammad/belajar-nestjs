export interface TodoResponse {
  id: number;
  title: string;
  body: string;
  username?: string;
  created_at?: string;
  updated_at?: string;
  category_name?: string;
}
export interface CreateTodoRequest {
  title: string;
  body: string;
  category_name?: string;
}
export interface UpdateTodoRequest {
  id: number;
  title?: string;
  body?: string;
}
export interface SearchTodoRequest {
  title?: string;
  page: number;
  size: number;
}

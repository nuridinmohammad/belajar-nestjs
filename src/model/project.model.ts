export interface ProjectResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectRequest {
  name: string;
}

export class UpdateProjectRequest {
  id: number;
  name?: string;
}

export interface SearchProjectRequest {
  name?: string;
  page: number;
  size: number;
}

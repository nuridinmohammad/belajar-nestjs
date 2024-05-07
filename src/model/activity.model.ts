export interface ActivityResponse {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  duration: number;
}

export interface CreateActivityRequest {
  title: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  employee_id?: number;
  project_id?: number;
}

export interface UpdateActivityRequest {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
}

export interface SearchActivityRequest {
  title?: string;
  project: string;
  page: number;
  size: number;
}

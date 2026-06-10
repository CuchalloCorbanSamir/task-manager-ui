export interface Task {

  id: number;

  title: string;

  completed: boolean;

  createdAt?: string;

  updatedAt?: string;

  createdBy?: string;

  updatedBy?: string;
}
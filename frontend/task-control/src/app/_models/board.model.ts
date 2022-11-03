import { TaskModel } from "./task.model";

export interface Board {
  _id?: string;
  name: string;
  description: string;
  created_at?: string;
  todo_color?: string;
  in_progress_color?: string;
  done_color?: string;
  tasks?: TaskModel[];
}

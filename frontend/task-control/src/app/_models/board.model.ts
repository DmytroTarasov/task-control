import { TaskModel } from "./task.model";

export interface Board {
  _id?: string;
  name: string;
  description: string;
  created_at: string;
  tasks: TaskModel[];
}

// export class Board {
//   constructor(
//     public name: string,
//     public description: string,
//     public created_at: string,
//     public tasks: Task[]
//   ) {}
// }

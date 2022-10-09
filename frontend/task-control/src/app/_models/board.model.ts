import { Task } from "./task.model";

export class Board {
  constructor(
    public name: string,
    public description: string,
    public created_at: string,
    public tasks: Task[]
  ) {}
}

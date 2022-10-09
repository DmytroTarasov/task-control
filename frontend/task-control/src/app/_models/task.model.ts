import { Board } from "./board.model";

export class Task {
  constructor(
    public name: string,
    public status: string,
    public created_at: string,
    public board: Board
  ) {}
}

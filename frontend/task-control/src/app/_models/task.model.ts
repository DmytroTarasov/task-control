import { Board } from "./board.model";

export interface TaskModel {
    name: string;
    status: string;
    created_at?: string;
    board: string;
}

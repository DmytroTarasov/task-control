import { Board } from "./board.model";

export interface TaskModel {
    _id?: string;
    name: string;
    status: string;
    created_at?: string;
    board: string;
}

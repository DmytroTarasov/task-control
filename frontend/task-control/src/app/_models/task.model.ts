import { CommentModel } from "./comment.model";

export interface TaskModel {
    _id?: string;
    name: string;
    status: string;
    created_at?: string;
    archived?: boolean;
    created_by?: { username: string };
    board: string;
    comments?: CommentModel[]
}

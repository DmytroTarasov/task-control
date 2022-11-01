export interface TaskModel {
    _id?: string;
    name: string;
    status: string;
    created_at?: string;
    archived?: boolean;
    board: string;
}

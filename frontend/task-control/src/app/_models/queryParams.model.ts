export interface QueryParams {
  sortBy: string | null;
  sortDirection: string;
  boardName?: string;
  taskName?: string;
}

export class QueryParams implements QueryParams {
  constructor(
    public sortBy: string | null,
    public sortDirection: string = 'asc',
    public boardName?: string,
    public taskName?: string
  ) {}
}

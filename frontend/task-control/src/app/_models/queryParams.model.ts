export interface QueryParams {
  sortBy: string | null;
  sortDirection: string | null;
  boardName: string | null;
}

export class QueryParams implements QueryParams {
  constructor(
    public sortBy: string | null,
    public sortDirection: string = 'asc',
    public boardName: string | null
  ) {}
}

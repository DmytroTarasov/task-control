import { Board } from "../_models/board.model";
import { TaskModel } from "../_models/task.model";
import { FilterPipe } from "./filter.pipe";

describe('FilterPipe', () => {
  const emptyBoards: Board[] = [];
  const boards: Board[] = [
    { _id: '1', name: 'fix a bug', description: 'descr1', tasks: [] },
    { _id: '2', name: 'board2', description: 'descr2', tasks: [] },
    { _id: '3', name: 'fix an issue with slider', description: 'descr3', tasks: [] }
  ];
  const tasks: TaskModel[] = [
    { _id: '1', name: 'task1', status: 'Todo', board: '1' },
    { _id: '2', name: 'task2', status: 'Todo', board: '1' },
    { _id: '3', name: 'task3', status: 'In Progress', board: '2' },
    { _id: '4', name: 'task4', status: 'Done', board: '2' },
    { _id: '5', name: 'task5', status: 'Done', board: '3' }
  ];
  let pipe: FilterPipe;

  beforeAll(() => {
    pipe = new FilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return initial boards', () => {
    expect(pipe.transform(emptyBoards, 'fix', 'name')).toEqual(emptyBoards);
  });

  it('should return boards with title fix', () => {
    expect(pipe.transform(boards, 'fix', 'name')).toEqual([boards[0], boards[2]]);
  });

  it('should return initial tasks', () => {
    expect(pipe.transform(tasks, '')).toEqual(tasks);
  });

  it('should return tasks with status Todo', () => {
    expect(pipe.transform(tasks, 'Todo')).toEqual([tasks[0], tasks[1]]);
  });

  it('should return tasks with status In Progress', () => {
    expect(pipe.transform(tasks, 'In Progress')).toEqual([tasks[2]]);
  });

  it('should return tasks with status Done', () => {
    expect(pipe.transform(tasks, 'Done', 'status')).toEqual([tasks[3], tasks[4]]);
  });

});

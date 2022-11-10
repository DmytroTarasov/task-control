import { Board } from "../_models/board.model";
import { LengthPipe } from "./length.pipe";

describe('LengthPipe', () => {
  const emptyBoards: Board[] = [];
  const boards: Board[] = [
    { _id: '1', name: 'fix a bug', description: 'descr1', tasks: [] },
    { _id: '2', name: 'board2', description: 'descr2', tasks: [] },
    { _id: '3', name: 'fix an issue with slider', description: 'descr3', tasks: [] }
  ];
  let pipe: LengthPipe;

  beforeAll(() => {
    pipe = new LengthPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 0', () => {
    expect(pipe.transform(emptyBoards)).toEqual(0);
  });

  it('should return 3', () => {
    expect(pipe.transform(boards)).toEqual(3);
  });
});

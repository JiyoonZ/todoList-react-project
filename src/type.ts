
export interface ITodo {
  id: number;
  text: string;
}

export interface IBoard {
  boardId: string;
  todos: ITodo[];
}

export interface ITodoList {
  [boardId: string]: ITodo[];
}
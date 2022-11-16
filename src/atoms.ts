import {atom, selector} from "recoil";

export interface ITodo {
  id: number;
  text: string;
  category: "TODO" | "DOING" | "DONE";
}
//atom 생성
export const todoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
});

//selector
export const todoSelector = selector({
  key: "todoSelector",
  get: ({get}) => {
    const todos = get(todoState);
    return [
      todos.filter((todo) => todo.category === "TODO"),
      todos.filter((todo) => todo.category === "DOING"),
      todos.filter((todo) => todo.category === "DONE"),
    ];
  },
});

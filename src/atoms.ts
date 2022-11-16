import {atom, selector} from "recoil";

export interface ITodo {
  id: number;
  text: string;
  category: "TODO" | "DOING" | "DONE";
}

export const categoryState = atom({
  key: "category",
  default: "TODO",
});
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
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});

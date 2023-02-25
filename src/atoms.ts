import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist({
  key: "todosList",
  storage: localStorage,
});
interface ITodoState {
  [key: string]: ITodo[];
}
export interface ITodo {
  id: number;
  text: string;
}
export interface IForm {
  board: string;
}

localStorage.setItem("categories", JSON.stringify({"TODO":[], "DOING":[], "DONE":[]}))
const defaultCategories = JSON.parse(
  localStorage.getItem("categories") as string
);

export const categoriesState = atom<string[]>({
  key: "categories",
  default: defaultCategories
    ? defaultCategories
    : {TODO: [], DOING: [], DONE: []},
});


export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    ...defaultCategories,
  },
  effects_UNSTABLE: [persistAtom],
});
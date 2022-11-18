// // category 목록
// const existedCategories = JSON.parse(
//   localStorage.getItem("categories") as string
// );
// export const categoriesState = atom<string[]>({
//   key: "categories",
//   default: existedCategories ? existedCategories : ["TODO", "DOING", "DONE"],
// });

// //selector
// export const todoSelector = selector({
//   key: "todoSelector",
//   get: ({get}) => {
//     const todos = get(todoState);
//     const category = get(categoryState);
//     return todos[category];
//   },
// });

import {atom, selector} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist({
  key: "todosList",
  storage: localStorage,
});
//새로운 카테고리가 추가될 수도 있기때문에 아래처럼 Interface 작성하기
interface ITodoState {
  [key: string]: ITodo[];
}
export interface ITodo {
  id: number;
  text: string;
}
export const todoState = atom<ITodoState>({
  key: "todo",
  default: {
    "To do": [],
    Doing: [],
    done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

const existedCategories = JSON.parse(
  localStorage.getItem("categories") as string
);
export const categoriesState = atom<string[]>({
  key: "categories",
  default: existedCategories ? existedCategories : ["TODO", "DOING", "DONE"],
});

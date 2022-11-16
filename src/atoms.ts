import {atom, selector} from "recoil";
import {recoilPersist} from "recoil-persist";
// type categories = "TODO" | "DOING" | "DONE";
// enum 은 문자열이 아닌 일련의 숫자를 부여함
// 따라서 실제값은 "TODO" 가 아닌 1
// 데이터를 유의미하게 주고싶다면
// "TODO" = "TODO"
// export enum Categories {
//   "TODO" = "TODO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }
export interface ITodo {
  id: number;
  text: string;
  category: string;
}

const {persistAtom} = recoilPersist({
  key: "todosList",
  storage: localStorage,
});

// 현재 active 중인 category
export const categoryState = atom<string>({
  key: "category",
  default: "TODO",
  //defailt : "TODO"
});
//atom 생성
export const todoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
// category 목록
const existedCategories = JSON.parse(
  localStorage.getItem("categories") as string
);
export const categoriesState = atom<string[]>({
  key: "categories",
  default: existedCategories ? existedCategories : ["TODO", "DOING", "DONE"],
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

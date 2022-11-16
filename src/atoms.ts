import {atom} from "recoil";

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

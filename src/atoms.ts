import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
import {ITodoList} from "./type";

const {persistAtom} = recoilPersist({
  key: "todosList",
  storage: localStorage,
});

const DEFAULT_CATEGORY = {
  "TODO":[], 
  "DOING":[], 
  "DONE":[]
}

export const todoState = atom<ITodoList>({
  key: "todo",
  default: {
    ...DEFAULT_CATEGORY,
  },
  effects_UNSTABLE: [persistAtom],
});
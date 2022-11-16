import React, {useEffect} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
  categoriesState,
  categoryState,
  ITodo,
  todoSelector,
  todoState,
} from "../atoms";
import CategoryNav from "./\bCategoryNav";
import CreateTodo from "./CreateTodo";
import ToDo from "./ToDo";

function TodoList() {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (evt: React.FormEvent<HTMLSelectElement>) => {
    setCategory(evt.currentTarget.value as any);
  };
  useEffect(() => {
    const existed = JSON.parse(localStorage.getItem("categories") as string);
    localStorage.setItem(
      "categories",
      existed
        ? JSON.stringify(existed)
        : JSON.stringify(["DOING", "DONE", "TODO"])
    );
  }, []);
  return (
    <div>
      <h1>🚀 TO Do List 🚀</h1>
      <hr />
      <CategoryNav />
      <CreateTodo />
      {todos?.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
}
export default TodoList;

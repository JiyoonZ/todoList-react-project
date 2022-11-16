import React from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
  Categories,
  categoryState,
  ITodo,
  todoSelector,
  todoState,
} from "../atoms";
import CategorySelect from "./CategoryNav";
import CreateTodo from "./CreateTodo";
import ToDo from "./ToDo";

function TodoList() {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (evt: React.FormEvent<HTMLSelectElement>) => {
    setCategory(evt.currentTarget.value as any);
  };

  return (
    <div>
      <h1>🚀 TO Do List 🚀</h1>
      <hr />
      <CategorySelect />
      <CreateTodo />
      {todos?.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
}
export default TodoList;

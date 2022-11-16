import React from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState, todoSelector, todoState} from "../atoms";
import CreateTodo from "./CreateTodo";
import ToDo from "./ToDo";

function TodoList() {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (evt: React.FormEvent<HTMLSelectElement>) => {
    setCategory(evt.currentTarget.value);
  };
  console.log(category);
  return (
    <div>
      <h1>🚀 TO Do List 🚀</h1>
      <hr />

      <select value={category} onInput={onInput}>
        <option value="TODO">To do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>

      <CreateTodo />
      {todos?.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
}
export default TodoList;

import React from "react";
import {useSetRecoilState} from "recoil";
import {ITodo, todoState} from "../atoms";

// 1. target 의 경로찾기 id로 수정할 todo 찾기 [index 찾기]
// 2. 새로운 todo 를 만들어서 수정하기
function ToDo({text, category, id}: ITodo) {
  const setTodos = useSetRecoilState(todoState);
  const clickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name},
    } = evt;
    setTodos((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === id);
      const newTodo = {
        ...prev[targetIndex],
        category: name as any,
      };
      const finalTodo = [
        ...prev.slice(0, targetIndex),
        newTodo,
        ...prev.slice(targetIndex + 1),
      ];
      console.log(prev, finalTodo);
      return finalTodo;
    });
  };

  return (
    <li>
      <span>{text} </span>
      {category !== "TODO" && (
        <button name="TODO" onClick={clickHandler}>
          To do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={clickHandler}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={clickHandler}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;

import React from "react";
import {useRecoilValue, useRecoilState} from "recoil";
import {categoriesState, ITodo, todoState} from "../atoms";
import styled from "styled-components";
// 1. target 의 경로찾기 id로 수정할 todo 찾기 [index 찾기]
// 2. 새로운 todo 를 만들어서 수정하기
function ToDo({text, category, id}: ITodo) {
  const [todos, setTodos] = useRecoilState(todoState);
  const categories = useRecoilValue(categoriesState);
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
  const deleteHanlder = (evt: React.MouseEvent<HTMLButtonElement>) => {
    console.log(evt.currentTarget.value);
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setTodos((prev) =>
        prev.filter((ele) => ele.id !== Number(evt.currentTarget.value))
      );
    }
  };
  return (
    <li>
      <span>{text} </span>
      {categories.map((ele) => {
        return (
          <button
            key={ele}
            disabled={ele === category}
            name={ele}
            onClick={clickHandler}
          >
            {ele}
          </button>
        );
      })}
      <Button value={id} onClick={deleteHanlder}>
        delete
      </Button>
    </li>
  );
}
const Button = styled.button`
  border: none;
  background-color: red;
  color: white;
  margin-left: 10px;
`;
export default ToDo;

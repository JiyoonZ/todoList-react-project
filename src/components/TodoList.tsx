import {useRecoilValue} from "recoil";
import {todoSelector} from "../atoms";
import CategoryNav from "./CategoryNav";
import CreateTodo from "./CreateTodo";
import ToDo from "./ToDo";
import styled from "styled-components";

function TodoList() {
  const todos = useRecoilValue(todoSelector);

  return (
    <Container>
      <Title>🚀 TO Do List 🚀</Title>
      <CategoryNav />

      <hr />
      <CreateTodo />
      {todos?.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </Container>
  );
}
const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  height: 600px;
  width: 600px;
  margin: auto;
  margin-top: 30px;
  border: 1px solid darkgray;
  border-radius: 10px;
  padding: 20px;
`;
export default TodoList;

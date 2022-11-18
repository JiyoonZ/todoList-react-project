import {Droppable} from "react-beautiful-dnd";
import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import styled from "styled-components";
import {ITodo, todoState} from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
`;
interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.draggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
interface IBoard {
  todos: ITodo[];
  boardId: string;
}
interface IForm {
  todo: string;
}
function Board({todos, boardId}: IBoard) {
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const setTodos = useSetRecoilState(todoState);

  const onValid = ({todo}: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
    };
    setValue("todo", "");
    setTodos((allBoards) => {
      return {...allBoards, [boardId]: [newTodo, ...allBoards[boardId]]};
    });
  };
  return (
    <Wrapper>
      <Title>{boardId.toUpperCase()}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", {
            required: true,
          })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            draggingFromThisWith={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {todos.map((todo, index) => (
              <DraggableCard
                key={todo.id}
                index={index}
                todoId={todo.id}
                todoText={todo.text}
              />
            ))}
            {/* 요소가 드래그될때마다 빈곳의 크기가 변하는거 방지 */}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

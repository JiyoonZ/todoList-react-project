import {Droppable} from "react-beautiful-dnd";
import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import styled from "styled-components";
import {todoState} from "../atoms";
import {IBoard, ITodoList} from "../type";
import DraggableCard from "./DraggableCard";

interface IForm {
  todo: string;
}
function Board({todos, boardId}: IBoard) {
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const setTodos = useSetRecoilState<ITodoList>(todoState);

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
  const delBoard = () => {
    const isClose = window.confirm(
      "삭제하시면 todo도 모두 삭제됩니다. 삭제하시겠습니까?"
    );
    if (isClose) {
      setTodos((prev) => {
        const {[`${boardId}`]: delkey, ...otherAnimal} = prev;
        return otherAnimal;
      });
    }
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("todo", {
            required: true,
          })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
        <Button>+</Button>
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
      <DelBtn onClick={delBoard}>삭제</DelBtn>
    </Wrapper>
  );
}

const DelBtn = styled.button`
  border: none;
  width: 50px;
  height: 30px;
  background-color: rgba(214, 48, 49, 0.5);
  color: white;
  border-radius: 15px;
  align-self: flex-start;
  margin-left: 15px;
  cursor: pointer;
`;
export default Board;

const Wrapper = styled.div`
  width: 300px;
  padding: 15px 0;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-shadow: 0.3rem 0.3rem 0.6rem #c8d0e7, -0.2rem -0.2rem 0.5rem #ffffff;
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
  width: 80%;
  margin: auto;
  &:focus {
    border: none;
  }
`;
const Input = styled.input`
  border: none;
  width: 90%;
  height: 40px;
  font-size: 18px;
  background-color: transparent;
  border-bottom: 3px dotted white;
  outline: none;
`;
export const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  width: 20px;
  height: 20px;
  color: white;
  font-weight: 700;
  font-size: 15px;
  border-radius: 50%;
  cursor: pointer;
`;
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import {todoState} from "../atoms";
import Board, {Button} from "./Board";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useRef} from "react";
import {useForm} from "react-hook-form";
interface IForm {
  board: string;
}
function TodoList() {
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    const {destination, source} = info;
    console.log(info);
    if (!destination) return;
    // board ID 체크하기
    if (destination?.droppableId === source.droppableId) {
      // 같이 보드내에서 움직일 경우
      setTodos((allBoards) => {
        // 수정이 일어난 보드만 복사하기 : dropId 는 board 의 이름이다.
        const boardCopy = [...allBoards[source.droppableId]];
        // 해당 보드의 배열중에 출발한index 번호로 드래그하려는 item을 알아내기!
        // index 는 해당 board 배열의 index
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(Number(destination?.index), 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setTodos((allBoards) => {
        // 출발할 보드 , 도착할 보드 복사하기
        const sourceBoard = [...allBoards[source.droppableId]];
        const destiBoard = [...allBoards[destination?.droppableId]];
        const taskOjb = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destiBoard.splice(destination?.index, 0, taskOjb);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: destiBoard,
        };
      });
    }
  };
  const onValid = (data: IForm) => {
    console.log(data.board, data);
    setValue("board", "");
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Title>🏁 My Todo List 🏁</Title>
      <DeleteIcon>
        <FontAwesomeIcon icon={faTrash} />
      </DeleteIcon>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
          ))}
          <AddBoard onSubmit={handleSubmit(onValid)}>
            <AddButton>+</AddButton>
            <Input
              {...register("board", {
                required: true,
              })}
              type="text"
              placeholder="Add your board!"
            />
          </AddBoard>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
const Input = styled.input`
  outline: none;
  background-color: transparent;
  border: none;
  padding-bottom: 10px;
  border-bottom: 1px solid white;
  color: white;
  &::placeholder {
    text-align: center;
    color: white;
  }
`;
const AddButton = styled(Button)`
  width: 40px;
  height: 40px;
  font-size: 30px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
`;
const AddBoard = styled.form`
  color: white;
  text-align: center;
  padding-top: 20px;
  width: 150px;
  height: 120px;
  border-radius: 5px;
  /* background-color: rgba(0, 0, 0, 0.4); */
`;
const DeleteIcon = styled.div`
  color: white;
  width: 60px;
  font-size: 30px;
  position: absolute;
  right: 10px;
  top: 30px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  margin-top: 30px;
  /* border: 1px solid white; */
  /* justify-content: center; */
  /* align-items: center; */
  height: 100vh;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
export default TodoList;

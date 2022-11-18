import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import {todoState} from "../atoms";
import Board from "./Board";

function TodoList() {
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
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>🚀 BOOM!</h1>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
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

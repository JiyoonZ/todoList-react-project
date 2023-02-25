import {DragDropContext, DropResult, Droppable} from "react-beautiful-dnd";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import {todoState} from "../atoms";
import Board, {Button} from "./Board";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import { ITodoList } from "../type";

export interface IForm {
  board: string;
}
function TodoList() {
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const [todos, setTodos] = useRecoilState<ITodoList>(todoState);

  const onDragEnd = (info: DropResult) => {
    const {destination, source, draggableId} = info;
    console.log(info, '드래그 확인')
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
    } else if(destination?.droppableId === "delete") {
       setTodos((prev) => {
         const updateTodo = todos[source.droppableId].filter((todo) => String(todo.id) !== draggableId);
         return {...prev, [source.droppableId]: updateTodo};
       });
    } else if (destination?.droppableId !== source.droppableId) {
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
    setValue("board", "");
    if (Object.keys(todos).includes(data.board)) {
      return alert(`이미 "${data.board}" 보드가 존재합니다.`);
    }
    setTodos((prev) => {
      return {...prev, [data.board]: []};
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Title>🏁 My Todo List 🏁</Title>
      <Droppable droppableId={"delete"}>
        {(magic, info) => (
          <>
            <DeleteArea
              isDraggingOver={info.isDraggingOver}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              <DelIcon>
                <FontAwesomeIcon icon={faTrash} />
              </DelIcon>
              <div>drag and drop!</div>
              {magic.placeholder}
            </DeleteArea>
          </>
        )}
      </Droppable>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board key={boardId} boardId={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
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
      </Wrapper>
    </DragDropContext>
  );
}
const Input = styled.input`
  outline: none;
  background-color: transparent;
  border: none;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.accentColor};
  &::placeholder {
    text-align: center;
    color: ${(props) => props.theme.accentColor};
  }
`;
const AddButton = styled(Button)`
  width: 40px;
  height: 40px;
  font-size: 30px;
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  background-color: ${(props) => props.theme.accentColor};
`;
const AddBoard = styled.form`
  color: white;
  text-align: center;
  padding: 20px 0 0 20px;
  width: 150px;
  height: 120px;
  border-radius: 5px;
  @media screen and (max-width: 780px) {
    margin: auto;
  }
`;
interface IDelProps {
  isDraggingOver: boolean;
}
const DeleteArea = styled.div<IDelProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#ef9da9" : "#b2bec3"};
  color: white;
  width: 120px;
  height: 70px;
  position: absolute;
  right: 35px;
  top: 30px;
  border-radius: 14px;
  div:nth-child(2) {
    text-align: center;
    margin-top: 6px;
  }
  @media screen and (max-width: 780px) {
    div:nth-child(2) {
      display: none;
    }
    height: 30px;
    width: 50px;
    top: 70px;
  }
`;
const DelIcon = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  padding-top: 10px;
  @media screen and (max-width: 780px) {
    font-size: 15px;
    padding-top: 5px;
  }
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
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  @media screen and (max-width: 780px) {
    flex-direction: column;

  }
  margin-top: 30px;
`;
const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 15px;
  @media screen and (max-width: 1060px) {
    grid-template-columns: repeat(2, auto);
  }
  @media screen and (max-width: 780px) {
    grid-template-columns: repeat(1, auto);
    margin : auto;
  }
`;
export default TodoList;

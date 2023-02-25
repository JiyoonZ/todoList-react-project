import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { todoState } from "../atoms";

interface IDraggableProps {
  todoId: number;
  todoText: string;
  index: number;
  boardId : string;
}
function DraggableCard({todoText, todoId, index, boardId}: IDraggableProps) {
  const [todos, setTodos] = useRecoilState(todoState);
  const delTodoHandler = (todoId: number) => {
    setTodos((prev) => {
      const updateTodo = todos[boardId].filter((todo) => todo.id !== todoId);
        return {...prev, [boardId]: updateTodo};
    })
  };

  return (
    <Draggable draggableId={todoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todoText}
          <FontAwesomeIcon
            icon={faXmark}
            className="xmark"
            onClick={() => delTodoHandler(todoId)}
          />
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : ""};
  display: flex;
  justify-content: space-between;
  .xmark {
    color: white;
    font-size: 15px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: rgba(214, 48, 49, 0.5);
  }
`;

export default React.memo(DraggableCard);

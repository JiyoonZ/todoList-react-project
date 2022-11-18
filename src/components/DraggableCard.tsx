import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {useRecoilState} from "recoil";
import {todoState} from "../atoms";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

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
    width: 18px;
    height: 18px;
    background-color: rgba(214, 48, 49, 0.5);
  }
`;
interface IDraggableProps {
  todoId: number;
  todoText: string;
  index: number;
}
function DraggableCard({todoText, todoId, index}: IDraggableProps) {
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
          <FontAwesomeIcon icon={faXmark} className="xmark" />
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);

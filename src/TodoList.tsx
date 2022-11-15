import React, {useState} from "react";

function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    // const {value} = evt.currentTarget;
    const {
      currentTarget: {value},
    } = evt;
    setToDo(value);
    setToDoError("");
  };
  const onSubmint = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(toDo);
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit", toDoError);
  };
  return (
    <div>
      <form onSubmit={onSubmint}>
        <input onChange={onChange} value={toDo} placeholder="Write a todo" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : ""}
      </form>
    </div>
  );
}
export default ToDoList;

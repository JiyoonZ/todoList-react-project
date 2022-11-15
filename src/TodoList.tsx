import React, {useState} from "react";

function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
    // const {value} = evt.currentTarget;
    const {
      currentTarget: {value},
    } = evt;
    setToDo(value);
  };
  const onSubmint = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmint}>
        <input onChange={onChange} value={toDo} placeholder="Write a todo" />
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;

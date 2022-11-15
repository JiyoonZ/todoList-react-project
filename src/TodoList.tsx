import React, {useState} from "react";
import {useForm} from "react-hook-form";

/**
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
 */

function ToDoList() {
  const {register, handleSubmit, formState} = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form
        style={{display: "flex", flexDirection: "column"}}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
        />
        <input
          placeholder="FirstName"
          {...register("firstName", {required: true})}
        />
        <input
          placeholder="LastName"
          {...register("lastName", {required: true})}
        />
        <input
          placeholder="Username"
          {...register("username", {required: true})}
        />
        <input
          placeholder="Password"
          {...register("password", {required: true, minLength: 5})}
        />
        <input
          placeholder="Password1"
          {...register("password1", {required: true, minLength: 5})}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;

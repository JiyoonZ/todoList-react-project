import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {DefaultValue} from "recoil";

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

interface IForm {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password1: string;
  extraError?: string;
}
function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    console.log(data);
    if (data.password !== data.password1) {
      return setError(
        "password1",
        {message: "Password are not the same"},
        {shouldFocus: true}
      );
    }
    // setError("extraError", {message: "Server offline"});
  };
  console.log("에러", errors);
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
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
        />
        <span>{errors?.email?.message}</span>
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
          {...register("username", {
            required: true,
            validate: {
              noZee: (value) =>
                value.includes("zee") ? "no zee allowed" : true,

              noZEE: (value) =>
                value.includes("ZEE") ? "no ZEE allowed" : true,
            },
          })}
        />

        <span>{errors?.username?.message}</span>
        <input
          placeholder="Password"
          {...register("password", {required: "password !", minLength: 5})}
        />
        <span>{errors?.password?.message}</span>
        <input
          placeholder="Password1"
          {...register("password1", {required: "password !", minLength: 5})}
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
export default ToDoList;

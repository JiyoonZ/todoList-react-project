import {useForm} from "react-hook-form";

interface IForm {
  toDo: string;
}
function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          placeholder="Write a todo"
          {...register("toDo", {
            required: "fill the blank!",
            minLength: {
              value: 2,
              message: "write least 2 words",
            },
          })}
        />
        <button>Add</button>
        <span>{errors?.toDo?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;

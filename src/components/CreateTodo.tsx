import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import {todoState} from "../atoms";

interface IForm {
  todo: string;
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IForm>();

  const onValid = ({todo}: IForm) => {
    setTodos((prev) => [
      {text: todo, category: "TODO", id: Date.now()},
      ...prev,
    ]);
    setValue("todo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        placeholder="Write a todo"
        {...register("todo", {
          required: "fill the blank!",
        })}
      />
      <button>Add</button>
      <span>{errors?.todo?.message}</span>
    </form>
  );
}

export default CreateTodo;

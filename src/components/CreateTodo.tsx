import {useForm} from "react-hook-form";
import {useRecoilValue, useRecoilState} from "recoil";
import {categoryState, ITodo, todoState} from "../atoms";

interface IForm {
  todo: string;
}

function CreateTodo() {
  const [todos, setTodos] = useRecoilState<ITodo[]>(todoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IForm>();

  const onValid = ({todo}: IForm) => {
    setTodos((prev) => [{text: todo, category, id: Date.now()}, ...prev]);
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

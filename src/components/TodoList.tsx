import {useForm} from "react-hook-form";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";

interface IForm {
  toDo: string;
}
interface ITodo {
  id: number;
  text: string;
  category: "DONE" | "DOING" | "TODO";
}
//atom 생성
const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IForm>();

  const onValid = ({toDo}: IForm) => {
    setToDos((prev) => [
      {id: Date.now(), text: toDo, category: "TODO"},
      ...prev,
    ]);
    setValue("toDo", ""); // input 태그
  };
  console.log(toDos);

  return (
    <div>
      <h1>🚀 To dos 🚀</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          placeholder="Write a todo"
          {...register("toDo", {
            required: "fill the blank!",
          })}
        />
        <button>Add</button>
        <span>{errors?.toDo?.message}</span>
      </form>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;

import {useRecoilValue} from "recoil";
import {todoState} from "../atoms";
import CreateTodo from "./CreateTodo";
import ToDo from "./ToDo";

function TodoList() {
  const todos = useRecoilValue(todoState);
  console.log(todos);
  return (
    <div>
      <h1>🚀 TO Do List 🚀</h1>
      <hr />
      <CreateTodo />
      <ul>
        {todos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}
export default TodoList;

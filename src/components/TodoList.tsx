import {useRecoilValue} from "recoil";
import {todoSelector, todoState} from "../atoms";
import CreateTodo from "./CreateTodo";
import ToDo from "./ToDo";

function TodoList() {
  const [todos, doing, done] = useRecoilValue(todoSelector);
  console.log(todos, doing, done);
  return (
    <div>
      <h1>🚀 TO Do List 🚀</h1>
      <hr />
      <CreateTodo />
      <h2>To Do</h2>
      <ul>
        {todos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}
export default TodoList;

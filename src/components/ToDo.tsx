import {ITodo} from "../atoms";

function ToDo({text, category, id}: ITodo) {
  const clickHandler = (newCategor: ITodo["category"]) => {
    console.log("i wanna to ", newCategor);
  };

  return (
    <li>
      <span>{text} </span>
      {category !== "TODO" && (
        <button
          onClick={() => {
            clickHandler("TODO");
          }}
        >
          To do
        </button>
      )}
      {category !== "DOING" && (
        <button
          onClick={() => {
            clickHandler("DOING");
          }}
        >
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button
          onClick={() => {
            clickHandler("DONE");
          }}
        >
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;

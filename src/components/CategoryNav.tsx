import React from "react";
import {useForm} from "react-hook-form";
import {useRecoilState} from "recoil";
import {categoriesState, categoryState} from "../atoms";

interface IForm {
  newCategory: string;
}
function CategoryNav() {
  const [category, setCategory] = useRecoilState<string>(categoryState);
  const [categories, setCategories] = useRecoilState<string[]>(categoriesState);
  const {register, handleSubmit} = useForm<IForm>();
  const onInput = (evt: React.FormEvent<HTMLSelectElement>) => {
    setCategory(evt.currentTarget.value as any);
  };
  const onValid = ({newCategory}: IForm) => {
    console.log("new", newCategory);
    setCategories((prev) => {
      return [...prev, newCategory];
    });
  };
  localStorage.setItem("categories", JSON.stringify(categories));
  console.log("update", categories);
  return (
    <div>
      <select value={category} onInput={onInput}>
        {categories.map((ele, idx) => {
          return (
            <option key={idx} value={ele}>
              {ele}
            </option>
          );
        })}
        {/* <option value="TODO">To do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option> */}
      </select>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          placeholder="add your category"
          {...register("newCategory", {
            required: "카테고리를 입력해주세요",
          })}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
export default CategoryNav;

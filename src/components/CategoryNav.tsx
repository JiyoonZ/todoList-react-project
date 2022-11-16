import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useRecoilState, useSetRecoilState} from "recoil";
import {categoriesState, categoryState} from "../atoms";
import styled from "styled-components";
interface IForm {
  newCategory: string;
}
function CategoryNav() {
  const setCategory = useSetRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState<string[]>(categoriesState);
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const [active, setActive] = useState("TODO");
  const clickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const activeCategory = evt.currentTarget.value;
    setCategory(activeCategory as any);
    setActive(activeCategory);
  };
  const onValid = ({newCategory}: IForm) => {
    console.log("new", newCategory);
    setCategories((prev) => {
      return [...prev, newCategory];
    });
    setValue("newCategory", "");
  };

  localStorage.setItem("categories", JSON.stringify(categories));
  return (
    <div>
      {categories.map((ele, idx) => {
        return (
          <Button
            key={idx}
            value={ele}
            isActive={ele === active}
            onClick={clickHandler}
          >
            {ele}
          </Button>
        );
      })}
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
const Button = styled.button<{isActive: boolean}>`
  height: 30px;
  border: none;
  margin: 2px;
  border-radius: 4px;
  color: ${(props) => (props.isActive ? "red" : "black")};
`;

export default CategoryNav;

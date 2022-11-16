import React from "react";
import {useRecoilState} from "recoil";
import {categoryState, Categories} from "../atoms";

function CategorySelect() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (evt: React.FormEvent<HTMLSelectElement>) => {
    setCategory(evt.currentTarget.value as any);
  };
  return (
    <select value={category} onInput={onInput}>
      <option value={Categories.TODO}>To do</option>
      <option value={Categories.DOING}>Doing</option>
      <option value={Categories.DONE}>Done</option>
    </select>
  );
}
export default CategorySelect;

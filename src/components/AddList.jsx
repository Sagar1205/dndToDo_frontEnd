import React from "react";
import { Plus } from "./Icons";

const AddList = ({ onAdd }) => {
  return (
    <div
      className="bg-gray-300 h-[10rem] w-[22rem] flex flex-col border-2 border-gray-400"
      style={{ backgroundColor: "#E7E7E7" }}
    >
      <div
        className="bg-gray-400 text-center py-1 text-lg"
        style={{ backgroundColor: "#D9D9D9" , borderBottom:"1px solid grey"}}
      >
        Create New List
      </div>
      <div className="flex justify-center pt-[2.5rem]">
        <button
          onClick={onAdd}
          className="bg-gray-200 rounded-full h-12 w-12 items-center flex justify-center hover:bg-gray-400"
          style={{ backgroundColor: "#F9F9F9" }}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default AddList;

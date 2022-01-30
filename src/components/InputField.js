import React from "react";

const InputField = (props) => {
  return (
    <div className="flex flex-col py-2">
      <label>{props.label}</label>
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className="rounded py-2 px-3 text-gray-700 input-bg focus:outline-blue-500"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputField;

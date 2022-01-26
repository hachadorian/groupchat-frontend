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
        className="border rounded py-2 px-3 text-gray-700 focus:outline-blue-500"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputField;

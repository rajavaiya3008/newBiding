import React from "react";

const InputField = ({
  id,
  name,
  value,
  handleChange,
  disable,
  index,
  currIndex,
  error,
}) => {
  return (
    <div className="flex flex-col h-[46px]">
      <input
        type="number"
        name={name}
        id={id}
        value={value}
        onChange={(e) => handleChange(e)}
        onKeyDown={(evt) =>
          ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()
        }
        disabled={disable}
        className="border"
      />
      {error[name] && currIndex === index && (
        <span className="text-red-400 text-sm">{error[name]}</span>
      )}
    </div>
  );
};

export default InputField;

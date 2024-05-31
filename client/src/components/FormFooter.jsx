import React from "react";

function FormFooter({
  className = "",
  text = "",
  link = "/",
  linkText = "",
  onClick = "",
}) {
  return (
    <p
      className={`text-[#ffffff] font-light text-[13px] md:text-[15px] ${className}`}
    >
      {text}
      <span className="pl-[5px] text-[#fc4747]" onClick={onClick}>
        {linkText}
      </span>
    </p>
  );
}

export default FormFooter;

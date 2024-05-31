import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
/* Button Component */
function Button({
  text = "",
  icon = false,
  type = "button",
  bgColor = "bg-[#FC4747]",
  textColor = "text-[#FFFFFF]",
  className = "",
  ...props
}) {
  return (
    <button
      className={`py-2 w-full rounded-3xl text-[13px] md:text-[15px] ${bgColor} ${textColor} ${className} transition-all duration-700 ease-linear  `}
      {...props}
    >
      <span className="flex items-center justify-center gap-3">
        {icon && <FaCirclePlay className="text-[28px]" />}
        {text}
      </span>
    </button>
  );
}

export default Button;

/* Form Input or Search Component */
import React, { forwardRef } from "react";
import { IoSearch } from "react-icons/io5";
function Input(
  {
    type = "text",
    search = false,
    className = "",
    placeholder = "",
    error = "",
    onClick,
    ...props
  },
  ref
) {
  return (
    <div className="w-full flex relative">
      {search && (
        <div className="pr-[15px] flex items-center">
          <button type="button" onClick={onClick}>
            <IoSearch className="text-[24px] text-white" />
          </button>
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full ${
          search
            ? "py-3 px-0 text-[18px] md:text-[24px] font-light focus:border-[#5a698f] focus:border-b-2"
            : `py-3 px-2 text-[13px] md:text-[15px] font-light border-b-[1px] border-[#5a698f] focus:border-b-2 focus:border-[#ffffff]`
        }  text-white bg-transparent outline-none my-1  placeholder:text-[#5a698f] cursor-pointer focus:caret-[#fc4747] ${className}`}
        ref={ref}
        {...props}
      />
      <span className="absolute top-4 right-[10px] text-[#fc4747]">
        {error}
      </span>
    </div>
  );
}

export default forwardRef(Input);

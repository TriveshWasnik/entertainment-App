import React from "react";

function Heading({ text = "", className = "" }) {
  return (
    <p
      className={`text-white text-[24px] md:text-[32px] font-light ${className}`}
    >
      {text}
    </p>
  );
}

export default Heading;

import React from "react";

function SubHeading({ name = "", className = "" }) {
  return <p className={`text-white  ${className} leading-6`}>{name}</p>;
}

export default SubHeading;

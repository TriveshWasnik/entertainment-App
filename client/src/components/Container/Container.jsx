import React from "react";

function Container({ children }) {
  return (
    /* Container is main container. all the components or elements are placed inside it. */
    <div className="w-full h-screen max-w-7xl px-4 mx-auto">{children}</div>
  );
}

export default Container;

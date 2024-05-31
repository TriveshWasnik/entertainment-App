/* Protect Route checked User authenticate or not. if not always shown Signup route */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, authentication = true }) {
  const { authStatus } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(
    function () {
      if (authentication && authStatus !== authentication) {
        navigate("/signup");
      } else if (!authentication && authStatus !== authentication) {
        navigate("/");
      }
      setLoader(false);
    },
    [authStatus, navigate, authentication]
  );

  return loader ? (
    <h1 className="text-center text-[32px] text-red-500">Loading...</h1>
  ) : (
    <>{children}</>
  );
}

export default ProtectedRoute;

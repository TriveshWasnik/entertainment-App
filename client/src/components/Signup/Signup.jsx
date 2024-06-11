import React, { useState } from "react";
import Heading from "../Heading";
import Input from "../Input";
import Button from "../Button";
import FormFooter from "../FormFooter";
import { MdMovie } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setAuthUser, setAuthStatus } from "../../store/userSlice";
import { API_END_POINT } from "../../utils/constant";

function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* get the loading state from user store */
  const { loading } = useSelector((store) => store.user);

  /* Toggle the signup form or login form */
  function loginHandler() {
    setIsLogin(!isLogin);
    setError("");
  }

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(setLoading(true));
    /* functionality of signup form */
    if (!isLogin) {
      const user = {
        email,
        password,
        repassword,
      };

      try {
        const res = await axios.post(`${API_END_POINT}/user/signup`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          setIsLogin(true);
        }
      } catch (error) {
        if (
          email.length === 0 ||
          password.length === 0 ||
          repassword.length === 0
        ) {
          dispatch(setLoading(false));
          setError(error.response.data.message);
        } else if (password.length < 8) {
          dispatch(setLoading(false));
          setError(error.response.data.message);
        }
      } finally {
        setEmail("");
        setPassword("");
        setRepassword("");
        setTimeout(() => {
          setError("");
        }, [5000]);
        dispatch(setLoading(false));
      }
    } else {
      /* functionality of login form */
      const user = { email, password };

      try {
        const res = await axios.post(`${API_END_POINT}/user/login`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }

        dispatch(setAuthUser(res.data.user));
        dispatch(setAuthStatus(true));
        navigate("/");
      } catch (error) {
        if (email.length === 0 || password.length == 0) {
          dispatch(setLoading(false));
          setError(error.response.data.message);
        } else {
          toast.error(error.response.data.message);
        }
      } finally {
        setEmail("");
        setPassword("");
        dispatch(setLoading(false));
      }
    }
  }

  return loading ? (
    <p className="py-40 text-center font-bold  text-3xl text-[#fc4747]">
      Loading....
    </p>
  ) : (
    <div className="w-full h-screen flex items-center flex-col">
      <div className="my-10 pt-10 md:my-16 md:pt-16">
        <MdMovie className="text-[#fc4747] mx-auto text-[40px]" />
      </div>
      <div className="max-w-[400px] md:w-[400px] mx-auto bg-[#161d2f] p-7 rounded-2xl">
        <Heading text={isLogin ? "Login" : "Sign Up"} />
        <form onSubmit={submitHandler}>
          <div className="my-4">
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              error={error}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
              error={error}
            />
            {!isLogin && (
              <Input
                type="password"
                placeholder="Repeat password"
                value={repassword}
                onChange={(e) => {
                  setError("");
                  setRepassword(e.target.value);
                }}
                error={error}
              />
            )}
          </div>
          <Button
            type="submit"
            className="my-5 hover:bg-[#ffffff] hover:text-black"
            text={
              isLogin
                ? `${loading ? "Loading..." : "Login to your account"}`
                : `${loading ? "Loading..." : "Create an account"}`
            }
          />
        </form>
        <FormFooter
          className="text-center"
          text={isLogin ? "Don't have an account" : "Already have an account?"}
          linkText={isLogin ? "Sign Up" : "Login"}
          onClick={loginHandler}
        />
      </div>
    </div>
  );
}

export default Signup;

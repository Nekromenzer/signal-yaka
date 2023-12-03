import React, { useState, useEffect } from "react";
// import { Col, Row, Image } from "antd";
// import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../firebase/GoogleSignin";

const SignIn = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen flex flex-col gap-[2rem] items-center justify-center">
      <div className="text-2xl text-white antialiased uppercase tracking-wider font-semibold mt-[-3rem]">
        <div className="h-[50px] bg-logo bg-no-repeat bg-center bg-contain w-[10rem]" />
      </div>
      <div className="bg-white p-4 rounded-2xl 2xl:h-[13rem] flex flex-col items-center justify-center max-w-[20rem] drop-shadow-lg shadow-emerald-300 duration-500 transition-all delay-75 hover:bg-emerald-50">
        <div className="text-[2rem] text-navy font-bold mb-8 text-center">
          {isLogin ? "Sign In" : "Sign up"}
        </div>
        <div
          className="rounded-lg h-[2rem] min-w-[5rem] w-full border transition-all text-white bg-emerald-600 hover:border-navy border-sea px-4 py-1 border-1  cursor-pointer hover:shadow mb-6 flex items-center justify-between hover:bg-navy group"
          onClick={() => signInWithGoogle()}
        >
          <span className="text-md font-semibold group-hover:text-white group-hover:ml-4 transition-all ease-in duration-300">
            Google
          </span>
          <FcGoogle className="text-xl group-hover:mr-4 transition-all ease-in duration-300" />
        </div>
        <p>
          Already have an account?{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {!isLogin ? "Sign In" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

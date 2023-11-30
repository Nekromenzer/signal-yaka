import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Ref = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const getCurrentUrl = window.location.href;
    const getIdByFilteringUrl = getCurrentUrl.split("/").pop();
    localStorage.setItem("referralId", getIdByFilteringUrl);
    if (localStorage.getItem("referralId")) {
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, []);
  return <div className="h-screen flex justify-center items-center">You will redirected to signIn page , please wait!</div>;
};

export default Ref;

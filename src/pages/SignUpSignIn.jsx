import React from "react";
import SignUp from "../components/SignUp";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import {useState} from 'react';

function SignUpSignIn() {
  const [loginForm,setLoginForm]=useState(false);
  return (
    <div>
      <Header />
      <div className="vw-100 vh-90 d-flex justify-content-center align-items-center">
        {loginForm? <SignIn setLoginForm={setLoginForm}/>:<SignUp setLoginForm={setLoginForm} />}
      </div>
    </div>
  );
}

export default SignUpSignIn;

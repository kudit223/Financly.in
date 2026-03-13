import React from "react";
import SignUp from "../components/SignUp";
import Header from "../components/Header";

function SignUpSignIn() {
  return (
    <div>
      <Header />
      <div className="vw-100 vh-90 d-flex justify-content-center align-items-center">
        <SignUp />
      </div>
    </div>
  );
}

export default SignUpSignIn;

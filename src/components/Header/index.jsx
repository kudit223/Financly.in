import React, { use, useEffect } from "react";
import "./header.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

function Header() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/');
        toast.success('Successfully Logout!!')
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  }
  
  return (
    <div className="d-flex justify-content-between align-items-center bg-primary text-white px-3 py-2 ">  
      <span className="fs-3 fw-500">Financly</span>
      {user && (
        <div className="d-flex align-items-center gap-1 me-3">
          <img
            width="40px"
            height="40px"
            className="rounded-circle"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-PzNKpGJWuBjaX9YZN3Zu19pnAb3i_lhinoreAfm1q1JWn3CmZuIXc0KBs07uQ8_fUb0dmjryzcPwnz2LLkX5B1pZhZfvp4etMU-U8fc&s=10"
            alt=""
          />
          <span className="fs-5">Udit</span>
          <span className="ms-4 fw-bold opacity-low" onClick={logout}>
            Logout
          </span>
        </div>
        
      )} 
    </div>
  );
}

export default Header;

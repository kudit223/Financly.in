import React from "react";
import "./signup.css";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../../redux/slices/nameSlice";
import { setEmail } from "../../redux/slices/emailSlice";
import { setPassword } from "../../redux/slices/passwordSlice";
import { setConfirmPassword } from "../../redux/slices/confirmPasswordSlice";
import { toast } from "react-toastify";


function SignUp() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name.value);
  const email = useSelector((state) => state.email.value);
  const password = useSelector((state) => state.password.value);
  const confirmPassword = useSelector((state) => state.confirmPassword.value);

  //when signUp Email btn click
  function signUpWithEmail(e){
    e.preventDefault();
    //check all field fill or not
    if(!name||!email||!password||!confirmPassword){
        toast.error('Please enter all fields!!')
        return;
    }

    // check for valid email syntax 
    const regex=/^\S+@\S+\.\S+$/;
    if(!regex.test(email)){
        toast.error('Please enter vaild email!!');
        return;
    }

    if(!(password===confirmPassword)){
        toast.error('Confirm Password is not matching!!');
        return;
    }
    toast.success('User Created!')
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(confirmPassword)
  }

  return (
    <div className="border cardContainer rounded-20 p-4 ">
      <h4 className="text-center">
        Sign Up on <strong className="text-primary">Financly</strong>
      </h4>
      <form>
        <label className="form-label mt-2" htmlFor="name">
          Full Name
        </label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          id="name"
          placeholder="Harsh Vardhan"
        />

        <label className="form-label mt-2" htmlFor="email">
          Email
        </label>
        <input
          className="form-control"
          type="text"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          id="email"
          placeholder="HarshVardhan@gmail.com"
        />

        <label className="form-label mt-2" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          id="password"
          placeholder="Example@123"
        />

        <label className="form-label mt-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="form-control"
          type="password"
          value={confirmPassword}
          onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
          id="confirmPassword"
          placeholder="Example@gmail.com"
        />

        <button className="btn btn-outline-primary mt-3 w-100" onClick={signUpWithEmail}>
          Sign Up with Email and Password
        </button>
        <p className="text-center mb-1">or</p>
        <button className="btn  btn-primary w-100">Sign Up with Google</button>

        <p className="text-center">Or Have An Account Already? Click Here</p>
      </form>
    </div>
  );
}

export default SignUp;

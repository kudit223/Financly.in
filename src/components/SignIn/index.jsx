import React from "react";
import { useState } from "react";
import './signin.css'
import { useSelector,useDispatch } from "react-redux";
import { setEmail } from "../../redux/slices/emailSlice";
import { setPassword } from "../../redux/slices/passwordSlice";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth,provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

function SignIn({setLoginForm}) {

  const dispatch=useDispatch();
  const email=useSelector(state=>state.email.value);
  const password=useSelector(state=>state.password.value);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

// when LogIn with and password btn click
  const signInWithEmail = (e) => {
    if(!checkForVaildUserDetails(e)) return;
    setLoading(true);

    //Login user using email and password
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Logged in 
    const user = userCredential.user;
    console.log(user);
    toast.success('User Logged In!!');
    navigate('/dashboard');
    setLoading(false);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
    setLoading(false)
  });

  };

  // Login with google account
  function logInWithGoogle(){
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          console.log(user);
          setLoading(false);
          navigate('/dashboard');
          toast.success("User Authenticated!!");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  // check for vaild user details like all fields are filled
  function checkForVaildUserDetails(e){
      e.preventDefault();
      //check all field fill or not
      if(!email||!password){
          toast.error('Please enter all fields!!')
          return false;
      }
      return true;
    }


  return (
    <div className="border signInContainer rounded-20 p-4 ">
      <h4 className="text-center">
        LogIn on <strong className="text-primary">Financly</strong>
      </h4>
      <form>
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

        <button
          className="btn btn-outline-primary mt-3 w-100"
          onClick={signInWithEmail}
          disabled={loading}
        >
          {loading ? "Loading....." : "LogIn with Email and Password"}
        </button>
        <p className="text-center mb-1">or</p>
        <button className="btn  btn-primary w-100" onClick={logInWithGoogle} disabled={loading}>
          {loading ? "Loading....." : "LogIn with Google"}
        </button>

        <p className="text-center cursor-pointer" onClick={()=>setLoginForm(false)}>Or Don't Have An Account? Click Here</p>
      </form>
    </div>
  );
}

export default SignIn;

import React from "react";
import "./signup.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, setDoc, doc, provider } from "../../firebase";
import { useState } from "react";
import { getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function SignUp({ setLoginForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  //when signUp Email btn click
  //sign up with email and password
  function signUpWithEmail(e) {
    if (!checkForVaildUserDetails(e)) return;
    setLoading(true);

    // create user with email and password on firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("User Created!!");
        emptyAllFields();
        createDoc(user);
        navigate('/dashboard');
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  }

  //sign up with google
  function signUpWithGoogle() {
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
          createDoc(user)
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

  // this function check user entered the vaild details like
  // all fields are filled , vaild email syntax, password length>8
  // and password and conform password same
  function checkForVaildUserDetails(e) {
    e.preventDefault();
    //check all field fill or not
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please enter all fields!!");
      return false;
    }

    // check for valid email syntax
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(email)) {
      toast.error("Please enter vaild email!!");
      return false;
    }
    //check for password is greater than 8
    if (password.length < 8) {
      toast.error("Password must be equal to or greater than 8 character");
      return false;
    }
    // check for password and confirm password is same
    if (!(password === confirmPassword)) {
      toast.error("Confirm Password is not matching!!");
      return false;
    }

    return true;
  }
  //after sign up all the field will be empty
  function emptyAllFields() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  //Create Doc
  async function createDoc(user) {
    //make sure that the doc with the uid doesn't exist

    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // toast.error("Doc already exists");
    }
  }
  return (
    <div className="border signUpContainer rounded-20 p-4 ">
      <h4 className="text-center">
        SignUp on <strong className="text-primary">Financly</strong>
      </h4>
      <form>
        <label className="form-label mt-2" htmlFor="name">
          Full Name
        </label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
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
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="confirmPassword"
          placeholder="Example@gmail.com"
        />

        <button
          className="btn btn-outline-primary mt-3 w-100"
          onClick={signUpWithEmail}
          disabled={loading}
        >
          {loading ? "Loading....." : "SignUp with Email and Password"}
        </button>
        <p className="text-center mb-1">or</p>
        <button
          className="btn  btn-primary w-100"
          onClick={signUpWithGoogle}
          disabled={loading}
        >
          {loading ? "Loading....." : "SignUp with Google"}
        </button>

        <p
          className="text-center cursor-pointer"
          onClick={() => setLoginForm(true)}
        >
          Or Have An Account Already? Click Here
        </p>
      </form>
    </div>
  );
}

export default SignUp;

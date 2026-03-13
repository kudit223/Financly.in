import React from "react";
import './signup.css'

function SignUp(){
    return(
        
            <div className="border cardContainer rounded-20 p-4 ">
                <h4 className="text-center">Sign Up on <strong className="text-primary">Financly</strong></h4>
                <form >
                    <label className="form-label mt-2" htmlFor="name">Full Name</label>
                    <input className="form-control" type="text" name="" id="name" placeholder="Harsh Vardhan" />

                    <label className="form-label mt-2" htmlFor="email">Email</label>
                    <input className="form-control" type="text" name="" id="email" placeholder="HarshVardhan@gmail.com" />

                    <label className="form-label mt-2" htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="" id="password" placeholder="Example@123" />

                    <label className="form-label mt-2" htmlFor="confirmPassword">Confirm Password</label>
                    <input className="form-control" type="password" name="" id="confirmPassword" placeholder="Example@gmail.com" />
                    <div className="d-grid">
                    <button className="btn btn-outline-primary mt-3">Sign Up with Email and Password</button>
                    <p className="text-center mb-2">or</p>
                    <button className="btn  btn-primary">Sign Up with Google</button>
                    </div>
                    <p className="text-center">Or Have An Account Already? Click Here</p>

                </form>
            </div>

    )
    
}

export default SignUp;
import React, { useState, useEffect } from 'react'
import f from "./../img/ff.png";
import g from "./../img/gg.png";
import t from "./../img/tt.png";
import i from "./../img/ic.png";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.scss";
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { auth } from '../firebase';





const SignInPage = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    
    const nav = useNavigate();

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            // console.log(user);
            if (user){
                nav("/card")
            }else{
                nav("/")
            }
        })
    },[]);

    const login = (e)=>{
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                if(errorCode == "auth/wrong-password"){
                    document.getElementById("error").style.display = "flex";
                    document.getElementById("error").innerHTML = "Wrong Password";
                }
                if(errorCode == "auth/user-not-found"){
                    function alert(){
                        
                        document.getElementById("error").style.display = "flex";
                        document.getElementById("error").innerHTML = "User not found";
                    }
                    alert();
                }
                if(errorCode == "auth/invalid-email"){
                    document.getElementById("error").style.display = "flex";
                    document.getElementById("error").innerHTML = "invalid email address";
                }
            });


        setEmail("");
        setPass("");
    };


  return (
    <>
      <div className="form-width">
                <h2 className='text-center my-5'>Login Page</h2>
                <form >

                    <div id='error' className='error-div' style={{display:"none"}}> </div>

                    <input type="email" id="form2Example1" value={email} className="form-control form-control-md mt-4" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" id="form2Example2" value={password} className="form-control form-control-md my-4" placeholder='Password' onChange={(e) => setPass(e.target.value)} />

                    <div className="row mb-2">
                        <div className="col d-flex justify-content-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form2Example34" />
                                <label className="form-check-label" htmlFor="form2Example34"> Remember me </label>
                            </div>
                        </div>

                        <div className="col">
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 my-2" onClick={login}>Login</button>

                    <div className="text-center">
                        <p>Not a member? <Link to="/signup">Register</Link></p>
                        <p>or sign up with:</p>

                        <button type="button" className="btn btn-floating mx-3">
                            <img src={f} />
                        </button>

                        <button type="button" className="btn btn-floating mx-3">
                            <img src={g} />
                        </button>

                        <button type="button" className="btn btn-floating mx-3">
                            <img src={t} />
                        </button>

                        <button type="button" className="btn btn-floating mx-3">
                            <img src={i} />
                        </button>
                    </div>

                </form>
            </div>
    </>
  )
}

export default SignInPage
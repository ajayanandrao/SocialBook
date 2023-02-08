import React, { useEffect } from 'react'
import { useState } from 'react';
import "./Signin.scss";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    const Login = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
            setEmail("");
            setPass("");
    };

 

//    useEffect(()=>{
//     const unsub = auth.onAuthStateChanged((user)=>{
//         console.log(user);
//         if(user){
//             // console.log("user logged in", user);
//             nav("/home");
//         }
//         else{
   
//         }
//     });
//     return unsub;
//    },[])

    return (
        <>
            <div className="center">
                <div className='mt-5' style={{ width: "300px" }}>
                    <h1>Sign in</h1> 

                    <form>

                        <div className="form-group">
                            <input type="email" className="form-control mt-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control my-3" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPass(e.target.value)} value={password} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={Login}>Login</button>

                    </form>


                </div>
            </div>
        </>
    )
}

export default SignIn
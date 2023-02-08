import React, { useState } from "react";
import "./AddCard.scss";
// import "./AddCardMixin.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import v from "./../../img/ui/velEs1.png";
import {HiMail} from "react-icons/hi"
import {HiLockOpen} from "react-icons/hi2"
import {FcGoogle} from "react-icons/fc"
import {BsGithub} from "react-icons/bs"
import {BsFacebook} from "react-icons/bs"


const AddCard = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const LoginBtn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("welcome")
        console.log(user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
      setEmail("");
      setPass("");
  };

  return (
    <>

    <div className="bg-img">
      <div className="ui-div">
          <div className="ui-phone"></div>
          <div className="ui-velE">
          <img src={v} className="img-vel-e"/>
          </div>
      </div>


      <div className="form-div">
      <div className="bg-form">
          <form>
            <div className="form-outline">
              <HiMail className="react-icon"/>
              <input
                type="email"
                id="form2Example1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control form-focus"
                placeholder="Email"
              />
             
            </div>

            <div className="form-outline my-4">
            <HiLockOpen className="react-icon"/>
              <input
                type="password"
                id="form2Example2"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                className="form-control form-focus"
                placeholder="password"
              />
              
            </div>

            <div className="row mb-2">
              <div className="col d-flex justify-content-center">
                <div className="form-check w-100 mb-3">
                
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form2Example31"
                  />
                  <label className="form-check-label"> Remember me </label>
                </div>
              </div>

              {/* <div className="col">
                <a href="#!">Forgot password?</a>
              </div> */}
            </div>

            <button
              type="submit"
              className="btn btn-color btn-primary btn-md w-50 btn-block mb-2"
              onClick={LoginBtn}
            >
              Login
            </button>

            <span className="ms-5" style={{cursor:"pointer"}}>SignUP</span>

            <div className="text-center">
              {/* <p>
                Not a member? <a href="#!">Register</a>
              </p> */}
              <p>or sign up with:</p>
              <FcGoogle className="react-icon btn-circle"/>
              <BsGithub className="react-icon btn-circle"/>
              <BsFacebook className="react-icon btn-circle"/>
            </div>
          </form>
        </div>
        
      </div>
    </div>

      
    </>
  );
};

export default AddCard;

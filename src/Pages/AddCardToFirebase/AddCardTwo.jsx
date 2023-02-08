import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./AddCardTwo.scss";
import v from "./../../img/ui/velEs1.png";
import { HiMail } from "react-icons/hi"
import { HiLockOpen } from "react-icons/hi2"
import { FcGoogle } from "react-icons/fc"
import { BsGithub } from "react-icons/bs"
import { BsFacebook } from "react-icons/bs"
import { BsPenFill } from "react-icons/bs"
import { MdConfirmationNumber } from "react-icons/md"



const AddCardTwo = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const SignUpBtn = async(e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Successfully signed in")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        // ..
      });
    setEmail("");
    setPass("");
    setName("");
  };



  return (
    <>

      <div className="bg-img">
        <div className="ui-div">
          <div className="ui-phone"></div>
          <div className="ui-velE">
            <img src={v} className="img-vel-e" />
          </div>
        </div>


        <div className="form-div-SignUp">
          <div className="bg-form">
            <form>

              <div className="form-outline mt-4">
                <BsPenFill className="react-icon" />
                <input
                  type="text"
                  id="form2Example1"
                  className="form-control form-focus"
                  placeholder="Name"
                />
              </div>

              <div className="form-outline my-4">
                <MdConfirmationNumber className="react-icon" />
                <input
                  type="text"
                  id="form2Example1"
                  className="form-control form-focus"
                  placeholder="Number"
                />
              </div>

              <div className="form-outline">
                <HiMail className="react-icon" />
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
                <HiLockOpen className="react-icon" />
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
                onClick={SignUpBtn}
              >
                SignUP
              </button>

              <span className="ms-5" style={{ cursor: "pointer" }}>Login</span>

              <div className="text-center">
                {/* <p>
                Not a member? <a href="#!">Register</a>
              </p> */}
                <p>or sign up with:</p>
                <FcGoogle className="react-icon btn-circle" />
                <BsGithub className="react-icon btn-circle" />
                <BsFacebook className="react-icon btn-circle" />
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* <div className="center-align vh-100">
        <div className="form-container ">
          <h1 className="center mb-5">Sign Up</h1>
          <form>
            <div className="form-outline mb-1">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control form-control-sm"
              />
              <label className="form-label">Name</label>
            </div>

            <div className="form-outline mb-1">
              <input
                type="email"
                id="form2Example1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control form-control-sm"
              />
              <label className="form-label">Email address</label>
            </div>

            <div className="form-outline mb-2">
              <input
                type="password"
                id="form2Example2"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                className="form-control form-control-sm"
              />
              <label className="form-label">Password</label>
            </div>

            <div className="row mb-1">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form2Example31"
                  />
                  <label className="form-check-label"> Remember me </label>
                </div>
              </div>

              <div className="col">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              onClick={SignUpBtn}
              className="btn btn-success btn-sm btn-block mb-2"
            >
              Sign Up
            </button>

            <div className="text-center">
              <p>allready a member? Login</p>
              <p>or sign up with:</p>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default AddCardTwo;

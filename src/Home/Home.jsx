import React, { useContext, useEffect, useState } from 'react'
import "./Home.scss";
import aj from "./../img/200.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContaxt';

const Home = () => {

    const { currentuser } = useContext(AuthContext);

    const nav = useNavigate();
    const SignOut = () => {
        signOut(auth).then(() => {
            nav("/");
        })
    };


    return (
        <>
            <div className="center">

                <div className="">
                    <img src={currentuser && currentuser.photoURL} style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "50%" }} alt="" />
                    <h1 className='my-5'>{currentuser && currentuser.displayName}</h1>
                    <button className='btn btn-primary' onClick={SignOut}>Sign Out</button>
                </div>
            </div>
        </>
    )
}

export default Home
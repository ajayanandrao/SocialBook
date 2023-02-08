import React from 'react'
import { useState } from 'react';
import "./Signup.scss";
import { collection, addDoc, getDocs, onSnapshot, setDoc, doc, } from "firebase/firestore";
import { auth, db, storage } from '../firebase';
import { useEffect } from 'react';
import aj from "./../img/203.png";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [name, setName] = useState("");
    const [img, setImg] = useState(null);
    // const [show, setShow] = useState([]);

    const nav = useNavigate();
    const colRef = collection(db, "users");
    const dispatch = useDispatch(); 
    const num = useSelector((state)=>state.counter.count);

    useEffect(() => {
        const unsub = onSnapshot(colRef, (snapshot) => {
            const arry = [];
            (snapshot.forEach((doc) => arry.push({ ...doc.data(), id: doc.id })));
            // setShow(arry);
        });
        return unsub;
    }, []);


    const submit = async (e) => {
        e.preventDefault();

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)


            const storageRef = ref(storage, "userPhotos/" + name);

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on('state_changed',
                (snapshot) => {

                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateProfile(res.user, {
                            displayName: name,
                            photoURL: downloadURL
                        }).then(() => {
                            // Profile updated!
                            alert("Profile updated")
                            // ...
                        }).catch((error) => {
                            // An error occurred
                            // ...
                        });
                    
                        await addDoc(colRef,{
                            uid: res.user.uid,
                            name: name,
                            email:email,
                            PhotoUrl: downloadURL,
                            // bytime: serverTimestamp(),
                          });

                          
                    });
                }
            );



        } catch (err) {
            alert(err.message);
        }



        setName(""); setEmail(""); setPass("");
        nav("/signin");
    };



    return (
        <>
            <div className="center">
                <div className='mt-5' style={{ width: "300px" }}>
                    <h1>Signup</h1>
                    <img style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "50%" }}
                        src={img ? URL.createObjectURL(img) : "https://i.pinimg.com/736x/d0/7a/f6/d07af684a67cd52d2f10acd6208db98f.jpg"} />
                    <form>
                        <div className="form-group">
                            <input type="file" className="form-control mt-3" placeholder="name" onChange={(e) => setImg(e.target.files[0])} />
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control mt-3" placeholder="name" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>

                        <div className="form-group">
                            <input type="email" className="form-control mt-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control my-3" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPass(e.target.value)} value={password} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
                        <Link to="/signin">Sign in</Link>

                    </form>

                </div>
            </div>

        </>
    )
}

export default Signup
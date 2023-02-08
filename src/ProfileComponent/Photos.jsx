import React, { useContext, useState } from "react";
import "./Photo.scss";
import { RxDotsVertical } from "react-icons/rx";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { async } from "@firebase/util";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { AuthContext } from "../AuthContaxt";
import { getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import About from "./About";
import Friends from "./Friends";


const Photos = () => {
  const { currentuser } = useContext(AuthContext);
  const colRef = collection(db, "Peoples");

  const [pid, setPid] = useState([]);
  const [like, setLike] = useState(false);
  const [title, setTitle] = useState("");
  const [num, setNum] = useState("");

  const [comment, setComment] = useState(false);

  useEffect(() => {
    const o = () => {
      onSnapshot(colRef, (snapshot) => {
        let newbooks =
          []; /*-----------------Creating new array for copy inside of firestore data */
        snapshot.docs.forEach((doc) => {
          /*------ Geting firestore data Snapshot */
          newbooks.push({
            ...doc.data(),
            id: doc.id,
          }); /*--------Pushing all firestore data int to the new array data */
        });
        setPid(newbooks);
      });
    };
    return o();
  }, []);

  const add = async () => {
    try {
      const docRef = await addDoc(collection(db, "Peoples"), {
        first: "Ajay Anandrao",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const update = async () => {
    await updateDoc(doc(db, "Peoples", num), {
      first: title,
    });
    // setTitle("");
  };

  const deletePost = async (id) => {
    const colRef = doc(db, "Peoples", id);
    deleteDoc(colRef);
  };

  const heart = async (id) => {
    if (like) {
      await deleteDoc(
        doc(db, "Peoples", id, "likes", currentuser && currentuser.uid)
      );
    } else {
      await addDoc(
        doc(db, "Peoples", id, "likes", currentuser && currentuser.uid),
        {
          userId: currentuser && currentuser.id,
        }
      );
    }
  };

  function on(id, name) {
    document.getElementById("overlay-off").style.display = "block";
    document.getElementById("showtext").innerHTML = id;
    document.getElementById("showtextname").innerHTML = name;
    if (id) {
      setNum(id);
    }

  }

  function off(id) {
    document.getElementById("overlay-off").style.display = "none";
  }
  // -------------------------------------------

  return (
    <>
      <div className="photo-bg">
        {/* <h1 className="mb-2">photo</h1> */}

        <div className="center">
          <div className="photo-div-bg">
            <div className="photo-grid">

              <div className="photo-div-inner">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                  class=" photo-img "
                  alt="Boat on Calm Water"
                />
              </div>

              <div className="photo-div-inner">
                <img
                  src="https://images.unsplash.com/photo-1542451313056-b7c8e626645f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                  class=" photo-img "
                  alt="Boat on Calm Water"
                  />
              </div>

              <div className="photo-div-inner">
                <img
                  src="https://images.unsplash.com/photo-1521109464564-2fa2faa95858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                  class=" photo-img "
                  alt="Boat on Calm Water"
                />
              </div>
              
              <div className="photo-div-inner">
                <img
                  src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  class=" photo-img "
                  alt="Boat on Calm Water"
                />
              </div>

              <div className="photo-div-inner">
                <img
                  src="https://images.unsplash.com/photo-1543425389-f01c86221d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  class=" photo-img "
                  alt="Boat on Calm Water"
                />
              </div>

              <div className="photo-div-inner">
                <img
                  src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=486&q=80"
                  class=" photo-img "
                  alt="Boat on Calm Water"
                  />
              </div>

              <div className="photo-div-inner">
                <img
                  src="https://images.unsplash.com/photo-1498263382026-c65d01dad017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  class=" photo-img "
                  alt="Boat on Calm Water"
                />
              </div>
              
              <div className="photo-div-inner">
                <img
                  src="https://images.unsplash.com/photo-1543443436-bc6deeff2eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  class=" photo-img "
                  alt="Boat on Calm Water"
                />
              </div>

            </div>
          </div>
        </div>
        {/* {pid.map((k) => {
          return (
            <div key={k.id}>

              {comment && (<h1>Comment page</h1>)}
              <button className="btn btn-success" onClick={() => setComment(!comment)}>comment</button>

              <button onClick={() => on(k.id, k.first)} >Turn on overlay effect</button>
              <div id="overlay-off" >
                <div className="overlay-inner-div">
                  <div>
                    <div className="o-bg">
                      <div onClick={() => off(k.id)} className="close">X</div>


                      <div className="show-txt" id="showtext"></div>
                      <div className="show-txt" id="showtextname"></div>
                      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                      <button className="btn btn-success w-25 mx-4" id="auto" onClick={update}>
                        update
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: "20px" }}>{k.first}</div>
              <div className="w">
                <button className="btn btn-info" onClick={() => deletePost(k.id)}>
                  delete
                </button>

                {like ? (<BsHeart className="icon" />) : (<BsHeartFill className="icon" />)}
                <button className="btn btn-primary" onClick={() => heart(k.id)}>
                  like
                </button>
              </div>
            </div>
          );
        })}

        <button className="btn btn-primary mt-5" onClick={() => add()}>
          Add
        </button> */}
      </div>
    </>
  );
};

export default Photos;

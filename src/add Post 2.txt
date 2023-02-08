import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import "./Card.scss";
import "./bgContainer.scss";
import { MdDelete, MdOndemandVideo } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { BsFillHeartFill, BsPeopleFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import aj from "./../../img/203.png";
import photo from "./../../img/photo.png";
import video from "./../../img/v.png";
import smile from "./../../img/smile.png";
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { TiVideo } from "react-icons/ti";
import { AuthContext } from "./../../AuthContaxt";
import { Link } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4, uuidv4 } from "uuid";
import { CircularProgress, colors } from "@mui/material";


const Card = () => {
  // Const Group-------------------------------------------
  const effectRan = useRef(false);
  const colRef = collection(db,"bunch");
  const q = query(colRef, orderBy("bytime", "desc"));
  const { currentuser } = useContext(AuthContext);
  const [docs, loading, error] = useCollectionData(q, orderBy("bytime", "desc"));
  // console.log(docs);
  
  //  UseState Group ------------------------------------
  // const [colorName, setColorName] = useState("");
  const [post, setPost] = useState("");
  const [postImg, setPostImg] = useState(null);

  const [update, setUpdate] = useState("");
  const [edit, setEdit] = useState("");

  const [color, setColor] = useState([]);
  const [img, setImg] = useState(null);
  const [send, setSend] = useState();

  const [form, setForm] = useState("");
  //  UseEffect -------------------------------------------
 
  // Edit Post -----------------------------------------------
  // const editPost = async (id) => {
  //   const colRef = doc(db, "colors", id);
  //   console.log(id);
  //   await updateDoc(colRef, {
  //     name: form,
  //   });
  //   setEdit("");
  // };

  // Delete a post from the database---------------------------

  const deletePost = async (uid) => {
    const colRef = doc(db, "bunch", uid);
    deleteDoc(colRef);
  };

  //  Add Post --------------------------------------------
  const addPost = () => {
    if (color) {

      const storageRef = ref(storage, v4());
      const uploadTask = uploadBytesResumable(storageRef, img);


      uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          await addDoc(colRef, {
            uid: currentuser.uid,
            photoURL: currentuser.photoURL,
            displayName: currentuser.displayName,
            name: post,
            img: downloadURL,
            bytime: serverTimestamp(),
          });

          await updateDoc(doc(db, "userPosts", currentuser.uid), {
            messages: arrayUnion({
              id: v4(),
              uid: currentuser.uid,
              photoURL: currentuser.photoURL,
              displayName: currentuser.displayName,
              name: post,
              img: downloadURL,
              bytime: serverTimestamp(),
            })
          });

        });
      }
    );


      

    }else{

    }

//  addDoc(colRef, {
//         name: post,
//         bytime: serverTimestamp(),
//       });

    setPost("");
    setImg(null);
  };


  // Heart Color Change ----------------------------------
  const heartColor = async (id) => {
    const colRef = doc(db, "UserPosts", id);
    var red = document.getElementById("heart");
    if (red.style.color == "white") {
      red.style.color = "red";
    } else {
      red.style.color = "white";
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && addPost();
  };


  useEffect(() => {
    const unSub = onSnapshot(collection(db, "bunch"), (snapshot) => {
      setSend(snapshot.docs.map((doc) =>({ id: doc.id, ...doc.data() })));
    });
    return unSub();
  }, []);

console.log(docs)
  return (
    <>
      <div className="wrapper">

        <div className="left">
          <div className="left-items-div"><BsPeopleFill className="left-icon" />Friends</div>
          <div className="left-items-div my-3"><TiVideo className="left-icon" />Watch</div>
          <div className="left-items-div"><IoLogoGameControllerB className="left-icon" />Game</div>
          <div></div>
        </div>

        <div className="bg-center"><div>

          <div className="center">
            <div className="post-container">
              <div className="user-post-container">
                <Link to="/profile"><img className="user-img" src={currentuser && currentuser.photoURL} /></Link>
                <input
                  className="user-post-input"
                  type="text"
                  placeholder={"Whats on in you'r mind ? "}
                  onChange={(e) => setPost(e.target.value)}
                  onKeyDown={handleKey}
                  value={post}
                />
                <span className="post-name" onClick={addPost} type="button">
                  Post
                </span>
              </div>

              <div className="post-add-container">

                <div className="post-category-contaner">
                  <label htmlFor="p" style={{ cursor: "pointer" }}>
                    <input type="file" id="p" onChange={(e)=>setImg(e.target.files[0])} style={{ display: "none" }} />
                    <img src={photo} className="post-cat-img" />
                    <span className="post-cat-title">Photos</span>
                  </label>
                </div>

                <div className="post-category-contaner">
                  <img src={video} className="post-cat-img" />
                  <span className="post-cat-title">Video</span>
                </div>
              
                <div className="post-category-contaner">
                  <img src={smile} className="post-cat-img" />
                  <span className="post-cat-title">Feeling</span>
                </div>
              </div>

              <div className="postImg-div">
                <img className="postImg" src={img ? URL.createObjectURL(img) : ""} alt="" />
              </div>
            </div>
          </div>

          <div className="center">

            <div className="outer-container" >
              {loading && <CircularProgress style={{marginTop:"5rem"}} color="info" />}

              {docs?.map((userList) => {
                return (
                  <Fragment key={userList.uid}>
                    <div className="card-container" id="d">
                      <div className="profile-container">

                        <img src={userList.photoURL} className="img" alt="" />
                        <div className="profile-name">{userList.displayName}</div>
                        <div className="profile-option-container">
                          <MdModeEdit className="react-icons" />

                          <MdDelete
                            type="button"
                            className="react-icons"
                            onClick={() => deletePost(userList.uid)}
                          />
                        </div>
                      </div>

                      <div className="post-data-container">
                        <div className="post-data">{userList.name}</div>
                        <div className="post-data-div">
                        <img className="post-data-img" src={userList.img} alt="" />
                        </div>
                      </div>

                      <div className="comment-container">
                        <div className="like-container">
                          <BsFillHeartFill
                            // onClick={heartColor(userList.id)}
                            id="heart"
                            className="react-icons"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div className="like-container">
                          <FaCommentDots className="react-icons" />
                        </div>
                        <div className="like-container">
                          <FaShare className="react-icons" />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}

              
            </div>
            
          </div>
        </div>
        </div>

        <div className="right">
          <div style={{ width: "250px" }}>
            <div className="sugges-div">
              <div style={{ fontSize: "16px" }}>Suggestion for you</div>
              <div className="right-seeall">see all</div>
            </div>

            <div className="user-sugges-div">
              <div className="user-sugges-profile">
                <img
                  className="user-sugges-img"
                  src="https://i.pinimg.com/564x/26/08/8c/26088cfdb07a07180715fac16322fe80.jpg"
                  alt=""
                />
                <div className="user-sugges-name">Neha jadhav</div>
              </div>
              <div className="user-sugges-follow">Follow</div>
            </div>

            <div className="user-sugges-div">
              <div className="user-sugges-profile">
                <img
                  className="user-sugges-img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV-izaTdeFLSVWLogS5HCdklTx6Sl4xote3w&usqp=CAU"
                  alt=""
                />
                <div className="user-sugges-name">Sagar patil</div>
              </div>
              <div className="user-sugges-follow">Follow</div>
            </div>

            <div className="user-sugges-div">
              <div className="user-sugges-profile">
                <img
                  className="user-sugges-img"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrDdaiV-buqV8iHvZsVIzaT9Y9oDfkTYb4A&usqp=CAU"
                  alt=""
                />
                <div className="user-sugges-name">Priti sawant</div>
              </div>
              <div className="user-sugges-follow">Follow</div>
            </div>
          </div>
        </div>

      </div>


    </>
  );
};

export default Card;

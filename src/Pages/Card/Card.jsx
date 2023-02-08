import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import "./Card.scss";
import "./bgContainer.scss";
import { MdDelete, MdOndemandVideo } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { BsFillHeartFill, BsHeart, BsHeartFill, BsPeopleFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { IoLogoGameControllerB, IoMdCloseCircle } from "react-icons/io";
import { HiOutlineDotsVertical, HiPencil } from "react-icons/hi";
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4, uuidv4 } from "uuid";
import { CircularProgress, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { RxDotsVertical } from "react-icons/rx";
import ReactTimeago from "react-timeago";
import "./Overlay.scss";
import "./ScrollTop.scss";
import { AiOutlineArrowUp } from "react-icons/ai";

const Card = () => {
  let mybutton = document.getElementById("scrollTopBtn");

  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      mybutton.style.display = "flex";
    } else {
      mybutton.style.display = "none";
    }
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  // Const Group-------------------------------------------
  const effectRan = useRef(false);
  const colRef = collection(db, "AllPosts");
  const q = query(colRef, orderBy("bytime", "desc"));

  const { currentuser } = useContext(AuthContext);
  const [docs, loading, error] = useCollectionData(q, orderBy("bytime", "desc"));

  //  UseState Group ------------------------------------

  const [postText, setPostText] = useState("");
  const [ApiData, setApiData] = useState([]);
  const [img, setImg] = useState(null);

  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  const [postImg, setPostImg] = useState(null);
  const [update, setUpdate] = useState("");
  const [edit, setEdit] = useState("");
  const [form, setForm] = useState("");

  //  UseEffect -------------------------------------------

  function on() {
    document.getElementById("overlay").style.display = "block";
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }


  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      setApiData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

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

  const deletePost = async (id) => {
    const colRef = doc(db, "AllPosts", id);
    deleteDoc(colRef);
  };

  function DropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  //  Add Post --------------------------------------------
  // const addPost = (e) => {
  //   e.preventDefault();

  //   addDoc(colRef, {
  //     name: postText,
  //     bytime: serverTimestamp(),
  //     // value: colorValue,
  //   });
  //   setPostText("");
  // };

  const [editInput, setEditInput] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [editPostImg, setEditPostImg] = useState(null);

  const postEdit = async () => {
    await updateDoc(doc(db, "AllPosts", idEdit), {
      name: editInput,
    });
    setEditInput("");
    EditOff();
  };

  const EditOn = async (id) => {
    setIdEdit(id);
    document.getElementById("editID").style.display = "block";
  };
  const EditOff = async (id) => {
    document.getElementById("editID").style.display = "none";
  };


  const addPost = async () => {

    if (ApiData) {

      const storageRef = ref(storage, "Post/" + v4());
      const uploadTask = uploadBytesResumable(storageRef, img);



      uploadTask.on('state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');

          if (progress < 100) {
            document.getElementById("p1").style.display = "block";
          }
          else {
            document.getElementById("p1").style.display = "none";
          }

        },
        (error) => {
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            await addDoc(colRef, {
              uid: currentuser.uid,
              photoURL: currentuser.photoURL,
              displayName: currentuser.displayName,
              name: postText,
              img: downloadURL,
              bytime: serverTimestamp(),
            });

            await updateDoc(doc(db, "userPostsList", currentuser.uid), {
              messages: arrayUnion({
                id: v4(),
                uid: currentuser.uid,
                photoURL: currentuser.photoURL,
                displayName: currentuser.displayName,
                name: postText,
                img: downloadURL,
                bytime: Timestamp.now(),
              })
            });

          });
        }
      );


    } else {

    }

    setImg(null);
    setPostText("");
  };

  const heartColor = async (uid) => {

  };

  const handleKey = (e) => {
    e.code === "Enter" && addPost();
  };

  const imgId = (i) =>{
    alert(i);
  };


  // Overlay On ------------------------------------------
  return (
    <>
      <div id="editID">
        <div className="overlay-inner">

          <div className="overlay-card-div">
            <div className="ovelay-off-div">
              <IoMdCloseCircle onClick={EditOff} style={{ fontSize: "28px", cursor: "pointer" }} />
            </div>

            <div className="overlay-text-div">
              <div className="overlay-text">
                <input type="text" className="form-control form-control-sm" onChange={(e) => setEditInput(e.target.value)} value={editInput} />
              </div>

              <div className="ovelay-text-end">
                <button className="btn btn-sm btn-success" onClick={postEdit}>Submit</button>
              </div>
            </div>

            <div className="center">
              <div className="overlay-img-div">
                <img className="overlay-img" src={editPostImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn" onClick={topFunction} id="scrollTopBtn" >
        <AiOutlineArrowUp className="top-arrow" />
      </div>

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
              <div className="post-inner" >
                <div className="user-post-container">
                  <Link to="/profile"><img className="user-img" src={currentuser && currentuser.photoURL} /></Link>

                  <input
                    className="user-post-input"
                    type="text"
                    placeholder={"Whats on in you'r mind ? "}
                    onChange={(e) => setPostText(e.target.value)}
                    onKeyDown={handleKey}
                    value={postText}
                  />
                  <span className="post-name" onClick={addPost} type="button">
                    Post
                  </span>
                </div>

                <div className="post-add-container">

                  <div className="post-category-contaner">
                    <label htmlFor="p" style={{ cursor: "pointer" }}>
                      <input type="file" id="p" onChange={(e) => setImg(e.target.files[0])} style={{ display: "none" }} />
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

              <Box sx={{ width: '100%' }}>
                <LinearProgress id="p1" style={{ display: "none" }} />
              </Box>

            </div>
          </div>


          <div className="center">

            <div className="outer-container" >
              <div className="center">{loading && <CircularProgress className="mt-5" />}</div>
              {ApiData?.map((userList) => {

                return (

                  <Fragment key={userList.id} >

                    <div style={{width:"100%"}} className="m w3-content w3-section">
                      <div className="w3-animate-zoom card-container" id="d">
                        <div className="profile-container">

                          <img src={userList.photoURL} className="img" alt="" />
                          <div className="profile-name">{userList.displayName}</div>

                          <div className="timeago ms-3" style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
                            <ReactTimeago date={new Date(userList?.bytime?.toDate()).toLocaleString()} />
                          </div>

                          <div className="profile-option-container">

                            <div class="drop-bg className w3-section">
                              <div className="click" id="myBtn" class="drop-btn btn">
                                <RxDotsVertical className="dot" />
                              </div>
                              <div class="drop-content w3-animate-zoom" >
                                <a href="#home " className="mt-2" onClick={() => EditOn(userList.id)}>Edit</a>
                                <a href="#about" onClick={() => deletePost(userList.id)}>Delete</a>
                                <a href="#about" onClick={() => imgId(userList.img)}>img</a>
                                  
                              </div>
                            </div>

                          </div>
                        </div>

                        <div className="post-data-container">
                          <span className="post-data">{userList.name}</span>

                          <div className="post-data-div mt-3">
                            <img className="post-data-img" src={userList.img} alt="" />
                          </div>
                        </div>

                        <div className="comment-container">
                          <div className="like-container">

                            <BsFillHeartFill id="heart" onClick={() => heartColor(userList && userList.uid)} className="react-icons" style={{ color: "white" }} />
                          </div>

                          <div className="like-container">
                            <FaCommentDots className="react-icons" />
                          </div>
                          <div className="like-container">
                            <FaShare className="react-icons" />
                          </div>
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

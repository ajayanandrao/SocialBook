import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs';
import { FaCommentDots, FaShare } from 'react-icons/fa';
import { MdDelete, MdModeEdit } from 'react-icons/md';
// import { AuthContext } from '../AuthContaxt';
import { db } from '../firebase';
import "./Post.scss";

const Post = () => {

  const [color, setColor] = useState([{ name: "loading", id: "initial" }]);
  const colRef = collection(db, "UserPosts");
  const q = query(colRef, orderBy("bytime", "desc"));
  // const { currentuser } = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      setColor(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const deletePost = async (id) => {
    const colRef = doc(db, "UserPosts", id);
    deleteDoc(colRef);
  };

  return (
    <>
    <div className="Post-bg">
            <div className="outer-container">
              {color?.map((colors) => {
                return (
                  <Fragment key={colors.id}>
                    <div className="card-container">
                      <div className="profile-container">
                        <div className="img"></div>
                        <div className="profile-name">Ajay Anandrao</div>
                        <div className="profile-option-container">
                          <MdModeEdit className="react-icons" />

                          <MdDelete
                            type="button"
                            className="react-icons"
                            onClick={() => deletePost(colors.id)}
                          />
                        </div>
                      </div>

                      <div className="post-data-container">
                        <span className="post-data">{colors.name}</span>
                        <span className="post-data mx-5">{colors.value}</span>
                      </div>

                      <div className="comment-container">
                        <div className="like-container">
                          <BsFillHeartFill
                            // onClick={heartColor(colors.id)}
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
    </>
  )
}

export default Post
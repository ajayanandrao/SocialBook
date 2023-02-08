import "./Navbar.scss";
import aj from "./../../img/203.png";
import { RiHomeFill, RiSearchFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { auth } from "../../firebase";
import { signOut, updateProfile } from "firebase/auth";
import { BsFillHeartFill, BsMessenger } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContaxt";

const openNav = () => {
  document.getElementById("mySidenav").style.width = "230px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const Navbar = () => {
  const nav = useNavigate();
  const { currentuser } = useContext(AuthContext);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user.email);
        document.getElementById("n").style.display = "flex";
      } else {
        document.getElementById("n").style.display = "none";
      }
    });
    return unsub;
  }, []);

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });

    nav("/");
  };

  const update = () => {
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  return (
    <>
      <div className="navbartop" id="n" style={{ display: "none" }}>
        <div className="container-fluid al-center">
          <RxHamburgerMenu className="navbar-lines" onClick={openNav} />
          <div className="navbar-name">
            <Link to="/card" className="link">
              Navbar
            </Link>
          </div>

          <div id="mySidenav" className="sidenav">
            <span className="closebtn" onClick={closeNav}>
              &times;
            </span>

            <Link to="/profile">
              <div className="nav-profile-c" onClick={closeNav} id="profile-c">
                <img
                  src={currentuser && currentuser.photoURL}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  alt=""
                />
                <span style={{ textTransform: "capitalize" }}>
                  {currentuser && currentuser.displayName}
                </span>
              </div>
            </Link>

            <hr />
            <div className="nav-link">
              <Link to="/card" onClick={closeNav} className="a">
                <span className="icon-c">
                  <RiHomeFill className="nav-icon" /> Home
                </span>
              </Link>

              <a href="#" onClick={closeNav} className="a">
                <span className="icon-c">
                  <BsFillHeartFill
                    className="nav-icon"
                    style={{ fontSize: "20px" }}
                  />
                  Notification
                </span>
              </a>

              <a href="#" onClick={closeNav} className="a">
                <span className="icon-c">
                  <BsMessenger
                    className="nav-icon"
                    style={{ fontSize: "20px" }}
                  />
                  Message
                </span>
              </a>

              <a href="#" className="a" onClick={SignOut} type="button">
                <span onClick={closeNav} className="icon-c">
                  <IoLogOut
                    className="nav-icon"
                    style={{ fontSize: "26px", marginRight: "15px" }}
                  />
                  Log out
                </span>
              </a>
            </div>
          </div>

          <div className="navbar-items">
            <div className="navbar-search-c">
              <input
                type="text"
                placeholder="Search"
                className="navbar-search"
              />
              <RiSearchFill className="nav-icon" />
            </div>
          </div>

          <div className="navbar-profile">
            <div className="navbar-inner-profile">
              <div className="n-icons">
                <BsMessenger
                  className="nav-icon"
                  style={{ fontSize: "21px" }}
                />
                <BsFillHeartFill
                  className="nav-icon"
                  style={{ fontSize: "21px" }}
                />
              </div>
              <div className="ms-5 dropdown">
                <img
                  src={currentuser && currentuser.photoURL}
                  className="navbar-profile-img dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  alt=""
                />
                <ul className="dropdown-menu ">
                  <li>
                    <Link to="/profile" className="link">
                      <button className="dropdown-item" type="button">
                        Profile
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button">
                      Setting
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={SignOut}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Navbar;

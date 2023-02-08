import React, { useContext, useState } from "react";
import "./UserProfile.scss";
import { AuthContext } from "../../AuthContaxt";
import { BsFillCameraFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import { styled } from '@mui/material/styles';
import { Tooltip, tooltipClasses, Typography, Zoom } from "@mui/material";

import bg from "./../../img/c4.png";
import ProfileSectionTwo from "./ProfileSectionTwo";

const UserProfile = () => {
  const { currentuser } = useContext(AuthContext);
  const [uimg, setUimg] = useState();

  function on() {
    document.getElementById("overlay").style.display = "block";
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));
  const divbg = {
    backgroundImage: `url(${bg}`
  }

  // ----------------------------------------------------------------


  return (
    <>
      <div className="bg-div" style={divbg}>
        <div className="profile-div">
          <div className="profile">

            <div id="overlay">
              <div className="over-x">
                <IoMdCloseCircle className="x" onClick={off} />
              </div>
              <div className="overlay-inner">
                <label htmlFor="uimg">
                  <img
                    src={
                      uimg
                        ? URL.createObjectURL(uimg)
                        : currentuser && currentuser.photoURL
                    }
                    className="profile-img"
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  id="uimg"
                  onChange={(e) => setUimg(e.target.files[0])}
                  style={{ display: "none" }}
                />
                <div>
                  <button className="btn btn-primary mt-4">Update Photo</button>
                </div>
              </div>
            </div>

            <HtmlTooltip style={{ borderRadius: "50%", background: "none" }}
              title={
                <React.Fragment>
                  <Typography color="inherit">Upload Photo</Typography>
                </React.Fragment>
              }
            >

              <div
                onClick={on}
                className="overlary-img-e"
                style={{
                  backgroundImage: `url(${currentuser && currentuser.photoURL})`,
                }}
              >
                <div className="pro-update-c">
                  <BsFillCameraFill style={{ fontSize: "26px" }} />
                </div>
              </div>

            </HtmlTooltip>

            <span className="profile-name">
              <h2 style={{ textTransform: "capitalize" }}>
                {currentuser && currentuser.displayName}
              </h2>
              <span className="total-friends">543 Friends</span>
            </span>
          </div>
        </div>
      </div>

    <ProfileSectionTwo/>

    </>
  );
};

export default UserProfile;

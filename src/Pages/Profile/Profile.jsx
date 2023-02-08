import React from 'react'
import "./Profile.scss";
import aj from "./../../img/203.png";
import { FaTwitter } from "react-icons/fa"
import { FaFacebookF } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"

const Profile = () => {
  return (
    <>
      <div className="profile-bg-container">

        <div className="profile-img-container">
          <img className="center-profile-img" src={aj} />
        </div>

        <div className="profile-bg-div">
          <div className="profile-wrapper-div">


            <div className="left-profile-wrapper-div">
              <button type="button" className="btn btn-primary left-visibility-btn btn-sm">Connect</button>

              <div className="left-data-div">
                <div className="left-count">22</div>
                <div className="left-text">Friend</div>
              </div>
              <div className="left-data-div">
                <div className="left-count">43</div>
                <div className="left-text">Photos</div>
              </div>
              <div className="left-data-div">
                <div className="left-count">38</div>
                <div className="left-text">Comment</div>
              </div>
            </div>

            <div className="center-profile-wrapper-div">
              <h1>Ajay Anandrao</h1>
            </div>

            <div className="right-profile-wrapper-div">
              <div className="right-profile-visibility-div">
                <button type="button" className="btn btn-primary right-visibility-btn btn-sm">Message</button>
              </div>
              <span className='btn-visible'>
                <button className="btn btn-primary pro-btns btn-color-connect btn-sm">Connect</button>
                <button className="btn  btn-primary btn-color-message pro-btns btn-sm">Message</button>
              </span>
            </div>

          </div>
          <div className="center-profile-wrapper-div2">
            <h1>Ajay Anandrao</h1>
          </div>

          <div className="left-profile-wrapper-div2">

              <div className="left-data-div">
                <div className="left-count">22</div>
                <div className="left-text">Friend</div>
              </div>
              <div className="left-data-div">
                <div className="left-count">43</div>
                <div className="left-text">Photos</div>
              </div>
              <div className="left-data-div">
                <div className="left-count">38</div>
                <div className="left-text">Comment</div>
              </div>
            </div>

          <div className="location-div">

            <div className="address">Parbhani, Maharashtra</div>
            <div className="job-status my-2">Solution Manager - Creative Tim Officer</div>
            <div className="univercity-div">University of Computer Science</div>
          </div>

          <hr className='pro-wrapp-hr' />

          <div className="pro-des">
            An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.
            <span class="see-more-text">See more</span>
          </div>
        </div>

      </div>
      <div className="second-div">
        <div className="second-div-absolut">
          <div className="support-div">
            <div className="support-div2">
              <div className="support-text">Thank you for supporting us!</div>
              <span className='support-text2'>Let's get in touch on any of these platforms.</span>
            </div>
            <div className="support-div3">

              <div className="social-icon-div">
                <FaTwitter className='social-icon' />
              </div>

              <div className="social-icon-div" style={{ background: "#3B5999" }}>
                <FaFacebookF className='social-icons' />
              </div>

              <div className="social-icon-div" style={{ background: "#151515" }}>
                <FaGithub className='social-icons' />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile


{/* <div className="profile-div">
  <div className='d-flex'>

    <div className='people-container'>

      <div className='people-left-btn'><button type="button" className="btn btn-info connect-btn btn-sm">Connect</button></div>

      <div className="people-div">
        <span className='friend-div'><h5>22</h5></span>
        <span className='friend-name-div'>Friend</span>
      </div>
      <div className="people-div">
        <span className='friend-div'><h5>37</h5></span>
        <span className='friend-name-div'>Photo</span>
      </div>
      <div className="people-div">
        <span className='friend-div'><h5>85</h5></span>
        <span className='friend-name-div'>Comment</span>
      </div>

    </div>

    <div className='profile-img-container-outer'>
      <div className="profile-img-container">
        <img src={aj} className="profile-img" />
      </div>
    </div>

    <div className='connect-container'>

      <div className='people-left-btn'>
        <button type="button" className="btn btn-primary message-btn btn-sm">Message</button>
      </div>

      <span className='btns-right'>
        <button type="button" className="btn btn-info connect-btn btn-sm">Connect</button>
        <button type="button" className="btn btn-primary message-btn btn-sm mx-4">Message</button>
      </span>
    </div>

  </div>
</div> */}
import React from 'react'
import About from '../../ProfileComponent/About';
import Friends from '../../ProfileComponent/Friends';
import Photos from '../../ProfileComponent/Photos';
import "./ProfileSectionTow.scss";


const ProfileSectionTwo = () => {

    function openCity(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
      }
      

  return (
    <>
    <div class="tab">
          <button class="tablinks active" onClick={(event) => openCity(event, 'Post')}>Post</button>
          <button class="tablinks" onClick={(event) => openCity(event, 'About')}>About</button>
          <button class="tablinks" onClick={(event) => openCity(event, 'Friend')}>Friend</button>
          <button class="tablinks" onClick={(event) => openCity(event, 'Photo')}>Photos</button>
        </div>

        <hr />

        <div id="Post" class="tabcontent" style={{ display: "block" }}>
          <h3>London</h3>
          <p>London is the capital city of England.</p>
        </div>

        <div id="About" style={{display:"none"}} class="tabcontent">
          <About />
        </div>

        <div id="Friend" style={{display:"none"}} class="tabcontent">
          <Friends />
        </div>

        <div id="Photo" style={{display:"none"}} class="tabcontent">
         <Photos/>
        </div>
    </>
  )
}

export default ProfileSectionTwo
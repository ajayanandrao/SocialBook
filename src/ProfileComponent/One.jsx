import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./One.scss";
import { BsThreeDots } from "react-icons/bs";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { SiHomeadvisor } from "react-icons/si";
import { RiHandbagFill } from "react-icons/ri";
import { IoMdSchool } from "react-icons/io";
import { CgSearch } from "react-icons/cg";

import json from "./user.json";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const One = () => {
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%"}}>
        <Box sx={{ borderBottom: 0, borderColor: "none" }}>
        
        <div className="center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            
            <Tab className="tab" label={<div className="post">Post</div>} {...a11yProps(0)} />
            <Tab className="tab" label={<div className="about">About</div>} {...a11yProps(1)} />
            <Tab className="tab" label={<div className="friend">Friends</div>} {...a11yProps(2)} />
            <Tab className="tab" label={<div className="photos">Photos</div>} {...a11yProps(3)} />
            
          </Tabs>
          </div>
        </Box>

        <TabPanel  value={value} index={0}>
          Post
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className="about-div-bg">
            <div className="about-container">
              <div className="about-sec-one">
                <h5>About</h5>
                <div className="about-list">Overviews</div>
                <div className="about-list">Work and education</div>
                <div className="about-list">Place lived</div>
                <div className="about-list">Contanct and basic info</div>
                <div className="about-list">Family and relationship</div>
                <div className="about-list">Detail about you</div>
              </div>
              <div className="about-sec-two">
                <div className="sec-two-list">
                  <RiHandbagFill className="about-s-two-icon" />{" "}
                  <span className="about-s-two-text">
                    Works at Affinity Express, EON IT park, Kharadi
                  </span>
                  <div className="about-opstion">
                    <GiEarthAfricaEurope className="about-postion-icon earth me-3" />
                    <BsThreeDots className="about-postion-icon" />
                  </div>
                </div>

                <div className="sec-two-list">
                  <IoMdSchool className="about-s-two-icon" />{" "}
                  <span className="about-s-two-text">
                    Studied Computer Science Engineering at shri shivaji
                  </span>
                  <div className="about-opstion">
                    <GiEarthAfricaEurope className="about-postion-icon earth me-3" />
                    <BsThreeDots className="about-postion-icon" />
                  </div>
                </div>

                <div className="sec-two-list">
                  <SiHomeadvisor className="about-s-two-icon" />{" "}
                  <span className="about-s-two-text">
                    Lives in Pune, Maharashtra
                  </span>
                  <div className="about-opstion">
                    <GiEarthAfricaEurope className="about-postion-icon earth me-3" />
                    <BsThreeDots className="about-postion-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <div className="friend-bg-div">
            <div className="friend-container">
              <div className="friend-div">
                <div className="friend-text">
                  <h5>Friend</h5>
                </div>

                <div className="search-friend-div">
                  <div className="search">
                    <CgSearch style={{ fontSize: "22px", color: "#cccccc" }} />
                    <input
                      type="text"
                      className="s-f-input"
                      placeholder="Search Friend"
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                  </div>
                </div>
              </div>

              <div className="friend-wrapper">
                {json
                  .filter((value) => {
                    if (search === "") {
                      return value;
                    } else if (
                      value.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((userlist) => {
                    return (
                      <div key={userlist.id} className="friend-list-div">
                        <img src={userlist.img} className="friend-img" alt="" />
                        <div className="friend-name">
                          <h6>{userlist.name}</h6>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={3}>
          Photos
        </TabPanel>
     
      </Box>
    </>
  );
};

export default One;

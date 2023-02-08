import React from 'react'
import bg from "./../img/ee.jpg";
import "./ProfilePage.scss";
import aj from "./../img/203.png";

const ProfilePage = () => {
    return (
        <>
            <div className="bg">
                <div className="profile-container-bg">
                   <div className="component">
                    <div className='container-one'>
                        <div className="left">
                            <button className='btn btn-left btn-primary btn-sm'>Connect</button>
                            <div className="left-container">
                                <div className="left-container">
                                    <div className="cout">22</div>
                                    <div className="cout-name">Friend</div>
                                </div>
                                <div className="left-container">
                                    <div className="cout">22</div>
                                    <div className="cout-name">Friend</div>
                                </div>
                                <div className="left-container">
                                    <div className="cout">22</div>
                                    <div className="cout-name">Friend</div>
                                </div>
                            </div>
                        </div>
                        <div className="center">
                            <img className='profile-img' src={aj} />
                        </div>
                        <div className="right">
                            <span >
                                <button className='btn right-btn btn-primary btn-sm'>Connect</button>
                                <button className='btn btn-mg btn-info btn-sm '>Message</button>
                            </span>
                        </div>
                    </div>
                    <div className="container-two">
                        <span className='d-container'>
                            <div className="left-container">
                                <div className="left-container">
                                    <div className="cout">22</div>
                                    <div className="cout-name">Friend</div>
                                </div>
                                <div className="left-container">
                                    <div className="cout">22</div>
                                    <div className="cout-name">Friend</div>
                                </div>
                                <div className="left-container">
                                    <div className="cout">22</div>
                                    <div className="cout-name">Friend</div>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div className="container-three">
                        <div className="user-name">
                            <h1>Ajay Anandrao</h1>
                        </div>
                        <div className="user-add">
                            Parbhani, Maharashtra
                        </div>
                        <div className="other-txt">
                            <span style={{ fontWeight: "500" }}>
                                Solution Manager - Creative Tim Officer
                            </span>
                            <span className='mt-2'>
                                University of Computer Science
                            </span>
                        </div>
                        <hr className='hr' />
                        <div className="other-text2">
                            An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.
                            <div className='see-all-txt'>
                                See all
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="section-two">
                        <div className="sec-two-txt">
                            <div><h5 className="txt-one">Thank you for supporting us!</h5></div>
                            <div><h6 className='txt-two'>Let's get in touch on any of these platforms.</h6></div>
                        </div>
                        <div className="icon-di">
                            sdfsdf
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default ProfilePage
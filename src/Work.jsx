import React from 'react'
import "./Work.scss";
import api from "./api.json";

const Work = () => {

  function btn(name) {
    alert(name)
    document.getElementById("txt").style.color = "red";
  };

  const Data = api.map((list) => {

    return (
      <div key={list.id} className="center">
        <div className='d-flex align-items-center'>
          <h1 id='txt'>{list.text}</h1>
          <button onClick={() => btn(list.text)} className="btn btn-info ms-5">btn</button>
        </div>
      </div>
    )
  })

  return (
    <div className='work-bg'>
      {Data}
    </div>
  )
}

export default Work
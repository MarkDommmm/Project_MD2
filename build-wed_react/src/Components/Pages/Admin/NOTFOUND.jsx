import React from 'react'
import "./Notfound.css"
import { useNavigate } from 'react-router-dom'
function NOTFOUND() {
  const navigate = useNavigate()
  return (
    <div className='notfound'>
      <div className="container">
        <div className="error">
          <p className="p">4</p>
          <span className="dracula">
            <div className="con">
              <div className="hair" />
              <div className="hair-r" />
              <div className="head" />
              <div className="eye" />
              <div className="eye eye-r" />
              <div className="mouth" />
              <div className="blod" />
              <div className="blod blod2" />
            </div>
          </span>
          <p className="p">4</p>
          <div className="page-ms">
            <p className="page-msg">
              {" "}
              Oops, the page you're looking for Disappeared{" "}
            </p>
            <button className="go-back" onClick={()=>navigate("/")}>Go Back</button>
          </div>
        </div>
      </div>
      <iframe
        style={{ width: 0, height: 0, border: "none" }}
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://instaud.io/_/2Vvu.mp3"
      />
    </div>

  )
}

export default NOTFOUND
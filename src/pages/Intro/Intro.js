import React from "react";
import { Link } from "react-router-dom"
import "Intro.css";

function Intro() {
    return(
        <div className="intro-wrapper" style={{color: "white"}}>
            <Link
                className={"home-nav"}
                to={"/"}
                style={{textDecoration: "none"}}
            >
                Home
            </Link>
            <Link
                className={"home-nav"}
                to={"/intro"}
                style={{textDecoration: "none"}}
            >
                Intro
            </Link>
            <Link
                className={"home-nav"}
                to={"/about"}
                style={{textDecoration: "none"}}
            >
                About
            </Link>
            <h1>Introduction/How to Use</h1>
            <div>this page will explain the program usage and overall</div>
        </div>
    )
    
}

export default Intro;
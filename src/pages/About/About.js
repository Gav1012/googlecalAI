import React from "react";
import { Link } from "react-router-dom"
import "About.css";

function About() {
    return (
        <div className="about-wrapper" style={{color: "white"}}>
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
            <h1>About/Credits(?)</h1>
            <div>Program created by: gavin poley</div>
            <div>Tech Stuff: JS, React, Firebase, OpenAI</div>
            <div>used internet for fancy css stuff (probably not implemented rn)</div>
        </div>
    )
}

export default About;
import React from "react"
import './Home.css'

function Home() {
    return (
        <div className="home-wrapper" style={{color: "white"}}>
            Welcome to GoogleCalendarAI (WIP of course)
            <input type="text" placeholder="Enter you prompt"></input>
            <button className="generate-button">Generate</button>
        </div>
    );
}


export default Home;
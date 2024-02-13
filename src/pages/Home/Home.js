import React from "react"
import './Home.css'

function Home() {
    return (
        <div className="home-wrapper" style={{color: "white"}}>
            Welcome to GoogleCalendarAI (WIP of course)
            <textarea type="text" className="input-wrapper" placeholder="Enter your calendar details"></textarea>
            <button className="generate-button">Generate</button>
        </div>
    );
}


export default Home;
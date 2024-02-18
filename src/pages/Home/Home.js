import React from "react"
import './Home.css'

function Home() {
    return (
        <div className="home-wrapper" style={{color: "white"}}>
            <button className="login-button">Login</button>
            <h1>Welcome to GoogleCalendarAI (WIP of course)</h1>
            <textarea type="text" className="input-wrapper" placeholder="Enter your calendar details"></textarea>
            <button className="generate-button">Generate</button>
        </div>
    );
}


export default Home;
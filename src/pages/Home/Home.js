import React, { useEffect, useState } from "react"
import './Home.css'

function Home() {
    const [message, setMessage] = useState([{}])

    useEffect(() => {
        fetch('http://localhost:5000/get_message')
        .then(res => res.json())
        .then(data => {
            setMessage(data);
            console.log(data);
        });
    }, []);

    return (
        <div className="home-wrapper" style={{color: "white"}}>
            <button className="login-button">Login</button>
            <h1>Welcome to GoogleCalendarAI (WIP of course)</h1>
            <textarea type="text" className="input-wrapper" placeholder="Enter your calendar details"></textarea>
            <button className="generate-button">Generate</button>
            <div>{message.members}</div>
        </div>
    );
}


export default Home;
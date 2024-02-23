import React, { useEffect, useState } from "react"
import './Home.css'

function Home() {
    // holds the ChatGPT response from ai.py
    const [message, setMessage] = useState([{}]);
    const [userInput, setUserInput] = useState('');

    // uses the /get_message route and sets to messsage state
    useEffect(() => {
        fetch('http://localhost:5000/get_message')
        .then(res => res.json())
        .then(data => {
            setMessage(data);
            console.log(data);
        });
    }, []);

    // sends the input from the textarea to chatgpt to be generated
    const sendDatatoFlask = async() => {
        const response = await fetch('http://localhost:5000/send_input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: userInput })
        });
        const responseData = await response.json();
        console.log(responseData);
    };
    
    // handles clicking the submit button to then send input data
    const handleSubmit = (event) => {
        event.preventDefault();
        sendDatatoFlask();
    }

    // main page react components, will need to update alooot
    return (
        <div className="home-wrapper" style={{color: "white"}}>
            <button className="login-button">Login</button>
            <h1>Welcome to GoogleCalendarAI (WIP of course)</h1>
            <textarea type="text" className="input-wrapper" placeholder="Enter your calendar details"></textarea>
            <button className="generate-button">Generate</button>
            <div>{message.message}</div>
        </div>
    );
}


export default Home;
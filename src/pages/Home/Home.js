import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../firebase.js";
import './Home.css';

function Home() {
    // holds the ChatGPT response from ai.py
    const [message, setMessage] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    // sends the input from the textarea to chatgpt to be generated
    // const sendDatatoFlask = async() => {
    //     const response = await fetch('http://localhost:5000/send_input', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ data: userInput })
    //     });
    //     const responseData = await response.json();
    //     console.log(responseData);
    //     setMessage(responseData.message);
    // };
    
    // handles clicking the submit button to then send input data
    const handleSubmit = (event) => {
        event.preventDefault();
        // sendDatatoFlask();
    }
    // https://firebase.google.com/docs/auth/web/google-signin
    // Login with Google using Firebase
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setIsLoggedIn(true);
                setUserData(user);
            }).catch((error) => {
                console.log({error});
            });
        console.log("googleSignIn");
    }
    // logout of Google
    const logout = () => {
        signOut(auth).then(() => {
            setUserData({});
            setIsLoggedIn(false);
            console.log("logout");
        }).catch((error) => {
            console.log(error);
        });
    }

    // main page react components, will need to update alooot
    return (
        <div className="home-wrapper" style={{color: "white"}}>
            {!isLoggedIn ? 
                <button className="login-button" onClick={googleSignIn}>Login with Google</button>:
                <button className="login-button" onClick={logout}>Logout</button>
            }
            <h1>Welcome to GoogleCalendarAI</h1>
            <form onSubmit={handleSubmit}>
                <textarea 
                    type="text" 
                    className="input-wrapper" 
                    placeholder="Enter your calendar details"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    >
                </textarea>
                <button type="submit" className="generate-button">Generate</button>
            </form>
            {message ? <div>{message}</div>: null}
        </div>
    );
}


export default Home;
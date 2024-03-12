import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../firebase.js";
import './Home.css';
import { google } from 'googleapis';


function Home() {
    // holds the ChatGPT response from ai.py
    const [message, setMessage] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [calendars, setCalendars] = useState([]);

    // const CLIENT_ID = 't';
    // const CLIENT_SECRET = 't';
    // const REDIRECT_URI = 'http://localhost:3000';

    // const oAuth2Client = new google.auth.OAuth2(
    //     CLIENT_ID,
    //     CLIENT_SECRET,
    //     REDIRECT_URI
    // );

    // handles clicking the submit button to then send input data
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    // https://firebase.google.com/docs/auth/web/google-signin
    // Login with Google using Firebase
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try { 
            const result = await signInWithPopup(auth, provider);
            setUserData(result.user);
            setIsLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    };
    // logout of Google
    const logout = async () => {
        try {
            await auth.signOut();
            setUserData(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error(error);
        }
    };

    // const fetchCalendars = (user) => {
    //     const calendar = google.calendar({ version: 'v3', auth: user });
    //     calendar.calendarList.list({}, (err, res) => {
    //         if (err) {
    //             console.error('Error fetching calendars:', err);
    //             return;
    //         }
    //         const calendars = res.data.items;
    //         setCalendars(calendars);
    //     });
    // }

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
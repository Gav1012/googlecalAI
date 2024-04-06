import React, { useState } from "react";
import { Link } from "react-router-dom"
import OpenAI from "openai";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import './Home.css';

// WILL NEED TO DO MASSIVE REDESIGN OF UI
function Home() {
    // holds the ChatGPT response from ai.py
    const [message, setMessage] = useState('');
    const [dayList, setDayList] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    // handles clicking the submit button to then send input data
    const handleSubmit = (event) => {
        processRequest();
        event.preventDefault();
    }

    const selectDay = (event) => {
        setDayList(event.target.value);
    }
    // https://firebase.google.com/docs/auth/web/google-signin
    // Login with Google using Firebase
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try { 
            const result = await signInWithPopup(auth, provider);
            setUserData(result.user);
            setIsLoggedIn(true);
            console.log(result.user);
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

    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });

    const processRequest = async() => {
        const completion = await openai.chat.completions.create({
            messages: [{role: "system", content: `You are an assitant that is proficient in creating schedules with times that a user provides. 
            You must adhere to these rules when responding
            1) You only respond with the days of the week with the times you suggest scheduling. 
            2) You should follow this format: Monday: Reading 1pm - 2pm, Gaming 2pm - 3pm, Coding 5am - 7am
            3) Following the previous rule, you need to include event name following the time it will be scheduled/take place`},
            {role: "user", "content": userInput}
        ],
            model: "gpt-3.5-turbo",
            max_tokens: 50
        })
        console.log(completion.choices[0].message.content);
        setMessage(completion.choices[0].message.content);
    }

    // main page react components, will need to update alooot
    return (
        <div className="home-wrapper" style={{color: "white"}}>
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
            {!isLoggedIn ? 
                <button className="login-button" onClick={googleSignIn}>Login with Google</button>:
                <button className="login-button" onClick={logout}>Logout</button>
            }
            <h1>Welcome to WeekPlannerAI</h1>
            
            <div class="daysOfWeek">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div class="days">
                <div class="day" onClick={() => setDayList("Sunday")}>SDay</div>
                <div class="day" onClick={() => setDayList("Monday")}>MDay</div>
                <div class="day" onClick={() => setDayList("Tuesday")}>TDay</div>
                <div class="day" onClick={() => setDayList("Wednesday")}>WDay</div>
                <div class="day" onClick={() => setDayList("Thursday")}>TDay</div>
                <div class="day" onClick={() => setDayList("Friday")}>FDay</div>
                <div class="day" onClick={() => setDayList("Saturday")}>SDay</div>
            </div>
            {dayList ? <div>{dayList}</div>: null}
            {message ? <div>{message}</div>: null}
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
        </div>
    );
}


export default Home;
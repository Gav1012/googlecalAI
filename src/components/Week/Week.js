import React, { useState } from "react";
import "./Week.css";

function Week() {
    const [dayList, setDayList] = useState('');
    return (
        <>
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
        </>
    )  
}

export default Week;
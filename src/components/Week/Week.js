import React, { useState } from "react";
import "./Week.css";

function Week() {
    const [dayList, setDayList] = useState({
        'Sunday': ['Event 1', 'Event 2'],
        'Monday': [],
        'Tuesday': ['Event 1', 'Event 2'],
        'Wednesday': ['Event 3'],
        'Thursday': ['Event 1', 'Event 2'],
        'Friday': ['Event 3'],
        'Saturday': ['Event 1', 'Event 2'],
    });
    const [selectedDay, setSelectedDay] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDay(date);
    };

    const parseChatGPTResponse = (response) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayMatches = response.match(new RegExp(daysOfWeek.join('|'), 'gi'));
        
        if (dayMatches) {
            dayMatches.forEach(day => {
                // Update the dayList state for each matched day
                console.log(day, dayList[day]);
            });
        }
    }

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
                {Object.keys(dayList).map((day) => (
                    <div class="day" onClick={() => handleDateClick(day)}>{dayList[day].length} events</div>
                ))}
            </div>
            {selectedDay ? (
                <div className="dayPopUp">
                    <div className="day-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedDay}</h2>
                        <ul>
                            {dayList[selectedDay].map((event, index) => (
                                <li key={index}>{event}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ): <h2>Select Day To See Events</h2>}
            <button type="button" onClick={ () => {parseChatGPTResponse("Sunday")}}>test button</button>
        </>
    )  
}

export default Week;
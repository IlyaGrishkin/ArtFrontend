import React, { useEffect, useState } from 'react';
import './Timer.css';


 

function Timer(props) {

    if (!localStorage.getItem("testTime")) {
        localStorage.setItem("testTime", 10000)
    }

    const startTime = localStorage.getItem("testTime")

    const duration = props.duration;
    const [time, setTime] = useState("...")
    const [humanTime, setHumanTime] = useState('...')


    function countdown() {
        let delta = Math.floor((Date.now() / 1000)) - startTime;
        const newTime = Math.max(Math.floor((duration - delta)), 0)
        setTime(newTime)
        setHumanTime(formatTime(newTime))
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    }


    useEffect(() => {
        if (time <= 0) {
            props.finishTest()
            props.onTimeout()
        }
        setTimeout(countdown, 1000)
    }, [time])



    return (
 
        <div className='timer my-3' >
            <img src="https://img.icons8.com/forma-light/96/time.png" alt="time"/>
            <h2 key={"timerTime"}>{humanTime}</h2>
        </div>
        
 
    )
}

export default Timer;
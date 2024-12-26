import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Timer.css';


 

function Timer(props) {

    if (!localStorage.getItem("testTime")) {
        localStorage.setItem("testTime", 10000)
    }

    const startTime = localStorage.getItem("testTime")

    const duration = props.duration;
    const [time, setTime] = useState("...")


    function countdown() {
        let delta = Math.floor((Date.now() / 1000)) - startTime;
        setTime(Math.max(Math.floor((duration - delta)), 0))
    }


    useEffect(() => {
        if (time <= 0) {
            props.onTimeout()
        }
        setTimeout(countdown, 1000)
    }, [time])



    return (
 
        <div className='timer my-3' >
            <img src="https://img.icons8.com/forma-light/96/time.png" alt="time"/>
            <h2 key={"timerTime"}>{time}</h2>
        </div>
        
 
    )
}

export default Timer;
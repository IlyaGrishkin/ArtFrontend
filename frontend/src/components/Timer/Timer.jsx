import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { getAPIData, addAnswer, results, getTimeFromServer } from '../../redux/reduxIndex';
import { useParams } from 'react-router-dom';
import './Timer.css';


let t = Date.now()

function getStartTime() {
    return t
}


function Timer(props) {

    if (!localStorage.getItem("testTime")) {
        localStorage.setItem("testTime", getStartTime())
    }

    const startTime = localStorage.getItem("testTime")

    const duration = props.duration;
    const [time, setTime] = useState("...")


    function countdown() {
        let delta = Math.floor((Date.now() - startTime) / 1000);
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
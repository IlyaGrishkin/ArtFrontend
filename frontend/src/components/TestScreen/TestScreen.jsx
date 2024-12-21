import { useParams } from "react-router-dom";
import TestNavbar from "../TestNavbar/TestNavbar";
import Timer from "../Timer/Timer";
import AppCard from "../Card/Card";
import { useEffect, useState } from "react";
import axios from 'axios'
import { handleToken } from "../../tools/lookups";
import './TestScreen.css'
import { Button } from "react-bootstrap";




function TestScreen(props) {
    const {id} = useParams()
    const {testID} = useParams()
    const [data, setData] = useState([])
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    const [questionQuantity, setQuestionsQuantity] = useState([])

    const [show, setShow] = useState(false)
    const [timerInfo, setTimerInfo] = useState(false)

    function getCompleted(){
        let obj = JSON.parse(localStorage.getItem("answers"))
        let res = []
        for (let key in obj) {
            if (obj[key].length > 0) {
                res.push(parseInt(key))
            }
        }
        return res
    }



    useEffect(() => {
        handleToken()
        const apiUrl = `http://localhost:8000/api/v1/tests/${testID}`;
        axios.get(apiUrl).then((resp) => {
          const serverData = resp.data;
          console.log(serverData)
          setData(serverData.data);
          setQuestion(serverData.data.items[id - 1])
          setAnswers(serverData.data.items[id - 1].answers)
          setQuestionsQuantity(serverData.data.items.length)
        });
      }, []);


    

    
    function handleTimeout(testId) {
        const ans = JSON.parse(localStorage.getItem("answers"))
        const viewData = {"testID": testID, "answers": ans}
        localStorage.removeItem("testTime")
        localStorage.setItem("viewingData",  JSON.stringify(viewData))
        localStorage.removeItem("answers")
        localStorage.removeItem("testRunning");
        window.location.href = `http://localhost:3000/${testId}/results/`
        
    }  
    
    if (window.screen.width < 600) {
        return (
            <div className='test-screen'>
                <div className="top-wrap">
                    <Button className='nav-button my-3' onClick={() => setShow(!show)}>Навигация</Button>
                    <Timer duration={20000} onTimeout={() => handleTimeout(testID)}/>
                </div>
                
                <div className='m-2 test-nav' style={{display: show ? 'block' : 'none'}}>
                    <TestNavbar questions_quantity={30} completed={getCompleted()}/>
                </div>
                
                <div className='my-card'>
                   <AppCard id={id} testID={testID} question={question} questionsQuantity={questionQuantity} variants={answers}/>
                </div>
                
            </div>
        )
    }
    else {

    
    return (
        <div className='test-screen'>
            <div className='m-2 test-nav'>
                <h3>Навигация</h3>
                <TestNavbar questions_quantity={30} completed={getCompleted()}/>
            </div>
            <div className='my-card'>
               <AppCard id={id} testID={testID} question={question} questionsQuantity={questionQuantity} variants={answers}/>
            </div>
            <div className="timer-main-wrap">
                <div className="timer-wrap" onMouseOver={() => setTimerInfo(true)} onMouseOut={() => setTimerInfo(false)}>
                    <Timer duration={20000} onTimeout={() => handleTimeout(testID)}/>
                    <div className="timer-info" style={{display: timerInfo ? 'block' : 'none'}}>
                        <p>По окончании таймера <br/> Ваши ответы отправятся автоматически</p>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}
    

}

export default TestScreen;

//
import { useParams } from "react-router-dom";
import TestNavbar from "../TestNavbar/TestNavbar";
import Timer from "../Timer/Timer";
import AppCard from "../Card/Card";
import { useEffect, useState } from "react";
import axios from 'axios'
import { motion } from "motion/react"
import './TestScreen.css'
import { API_URLS } from "../Utils/constants";
 




function TestScreen(props) {
    const { id } = useParams()
    const { testID } = useParams()
    const [data, setData] = useState([])
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    const [questionQuantity, setQuestionsQuantity] = useState([])
    const [pictureURL, setPictureURL] = useState("")

    const [show, setShow] = useState(false)
    const [timerInfo, setTimerInfo] = useState(false)

    function getCompleted() {
        let obj = JSON.parse(localStorage.getItem("answers"))
        let res = []
        for (let key in obj) {
            if (obj[key].length > 0) {
                res.push(parseInt(key))
            }
        }
        return res
    }

    const testDuration = parseInt(JSON.parse(localStorage.getItem("testDuration")))


    async function fetchData() {
         
            const apiUrl = `http://localhost:8000/api/v1/tests/${testID}`;
            await axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            setData(serverData.data);
            setQuestion(serverData.data.items[id - 1])
            setAnswers(serverData.data.items[id - 1].answers)
            setQuestionsQuantity(serverData.data.items.length)
            setPictureURL(serverData.data.items[id - 1].picture)
            localStorage.setItem("testData", JSON.stringify(serverData))
        })
        
        
    }

    


    useEffect(() => {fetchData();}, []) 
    





function handleTimeout(testId) {
    localStorage.removeItem("testTime")
    localStorage.removeItem("answers")
    localStorage.removeItem("testRunning");
    localStorage.removeItem("testData")
    window.location.href = `http://localhost:3000/${testId}/results/`

}


//if (JSON.parse(localStorage.getItem("testRunning")) != testID) {
    //return (
        //<div>
            //<h1>Вы уже проходите другой тест</h1>
        //</div>
   // )
//}

//else
 {
    return (
        <div className='container-fluid'>
            <div className="row d-flex justify-content-center">
                <div className='col-5 col-sm-4 col-md px-0 px-sm-4'>
                    <h3>Навигация</h3>
                    <TestNavbar questions_quantity={questionQuantity} completed={getCompleted()} />
                </div>
    
                <div className="col-5 col-sm-4 col-md px-0 px-sm-4 order-md-2">
                    <div className="timer-wrap" onMouseOver={() => setTimerInfo(true)} onMouseOut={() => setTimerInfo(false)}>
                        <Timer duration={testDuration} onTimeout={() => handleTimeout(testID)} />
                        <div className="timer-info" style={{ display: timerInfo ? 'block' : 'none' }}>
                            <p>По окончании таймера <br /> Ваши ответы отправятся автоматически</p>
                        </div>
                    </div>
                </div>
                <motion.div 
                    initial={
                        {
                            opacity: 0
                        }
                    }
                    animate={
                        {
                            opacity: 1,
                        }}
                    transition={{
                            duration: 0.7,
                            ease: "linear"
                        }}
                className='col-12 col-sm-8 order-md-1 col-md-6 col-lg-5'>
                    <AppCard width={100} id={id} testID={testID} question={question} questionsQuantity={questionQuantity} variants={answers} picture={pictureURL} />
                </motion.div>
    
            </div>
    
    
    
        </div>
    )
    

}


    

}

export default TestScreen;

//
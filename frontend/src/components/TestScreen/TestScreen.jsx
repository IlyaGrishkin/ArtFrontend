import { useParams } from "react-router-dom";
import TestNavbar from "../TestNavbar/TestNavbar";
import Timer from "../Timer/Timer";
import AppCard from "../Card/Card";
import { useEffect, useState } from "react";
import axios from 'axios'
import { motion } from "motion/react"
import './TestScreen.css'
import { API_URLS, getTest, getTestResult, URLS } from "../Utils/constants";






function TestScreen(props) {
    
    const { id } = useParams()
    const { testID } = useParams()
    const [data, setData] = useState([])

    const questionMemo = JSON.parse(localStorage.getItem("serverData"))?.data?.items[id - 1]
    const answersMemo = JSON.parse(localStorage.getItem("serverData"))?.data?.items[id - 1]?.answers
    const quantityMemo = JSON.parse(localStorage.getItem("serverData"))?.data?.items?.length
    const pictureMemo = JSON.parse(localStorage.getItem("serverData"))?.data?.items[id - 1]?.picture

    const [question, setQuestion] = useState(questionMemo ? questionMemo : [])
    const [answers, setAnswers] = useState(answersMemo ? answersMemo : [])
    const [questionQuantity, setQuestionsQuantity] = useState(quantityMemo ? quantityMemo : [])
    const [pictureURL, setPictureURL] = useState(pictureMemo ? pictureMemo : "")

    const [show, setShow] = useState(false)
    const [timerInfo, setTimerInfo] = useState(false)

    const [userAnswers, setUserAnswers] = useState({})
    const [active, setActive] = useState([]);

    const userAnswersSetter = (newAns) => {
        setUserAnswers(newAns)
    }

    const activeSetter = (newActive) => {
        setActive(newActive)
    }

    const testDuration = parseInt(JSON.parse(localStorage.getItem("testDuration")))



    async function fetchData() {

        const apiUrl = getTest(testID);
        await axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;

            setData(serverData.data);
            setQuestion(serverData.data.items[id - 1])
            setAnswers(serverData.data.items[id - 1].answers)
            setQuestionsQuantity(serverData.data.items.length)
            setPictureURL(serverData.data.items[id - 1].picture)
            localStorage.setItem("serverData", JSON.stringify(serverData))
        })
        .catch(resp => {
            console.log(resp)
        })
    }

    async function getActualAnswers() {
        const apiUrl = API_URLS.UPDATE_TEST;

        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
            }
        }
        await axios.post(apiUrl,
            {
                test_id: testID,
                user_answers: {}
            },
            config
        )

            .then((resp) => {
                const serverData = resp.data;
                const ans = serverData.data.user_answers;
                setUserAnswers(ans)
                setActive(ans[id] ? ans[id] : [])
                console.log('getActual', serverData);
            })
            .catch(resp => {
                console.log(resp)
                if (resp.response.status == 400) {
                    window.location.href = URLS.TEST_RESULT
                }
            })
    }

    useEffect(() => { fetchData(); getActualAnswers() }, [])


    function getCompleted(ans) {
        let res = []

        for (let key in ans) {

            if (ans[key].length > 0) {
                res.push(parseInt(key))
            }
        }
        return res
    }


    function handleTimeout(testId) {
        localStorage.removeItem("testTime")
        localStorage.removeItem("answers")
        localStorage.removeItem("testRunning");
        localStorage.removeItem("testData")
        window.location.href =  getTestResult()

    }

    function finishTest() {
        localStorage.removeItem("testRunning");
        localStorage.removeItem("serverData")

        const apiUrl = API_URLS.FINISH_TEST;
        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
            }
        }
        axios.post(apiUrl,
            {
            },
            config
        )

            .then((resp) => {
                console.log("finishTest")
                console.log(resp.data);
            })
            .catch(resp => {
                console.log(resp)
            })
            
    }


    {
        return (
            <div className='container-fluid'>
                <div className="row d-flex justify-content-center">
                    <div className='col-5 col-sm-4 col-md px-0 px-sm-4'>
                        <h3>Навигация</h3>
                        <TestNavbar questions_quantity={questionQuantity} completed={getCompleted(userAnswers)} />
                    </div>

                    <div className="col-5 col-sm-4 col-md px-0 px-sm-4 order-md-2">
                        <div className="timer-wrap" onMouseOver={() => setTimerInfo(true)} onMouseOut={() => setTimerInfo(false)}>
                            <Timer duration={testDuration} onTimeout={() => handleTimeout(testID)} finishTest={finishTest}/>
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
                        className='col-12 col-sm-8 order-md-1 col-md-6 col-lg-5 d-flex justify-content-center'>
                        <AppCard width={90} id={id} testID={testID} question={question} questionsQuantity={questionQuantity}
                            variants={answers} picture={pictureURL}
                            userAnswers={userAnswers} active={active} getActual={getActualAnswers} 
                            setActive={activeSetter} setAnswers={userAnswersSetter}
                            finishTest={finishTest}/>
                    </motion.div>

                </div>



            </div>
        )


    }




}

export default TestScreen;

//
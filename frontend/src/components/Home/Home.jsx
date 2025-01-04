import { useEffect, useState } from 'react';
import './Home.css'
import { Checkbox } from '@mui/material'
import { BootstrapBreakpoints, questionsNumber, questionsNumberStrToNum, testDurations, testDurationsStrToNums, topics } from '../Utils/constants'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { MyVerticallyCenteredModal } from '../Modal/Modal';

export function Home() {

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 992px)").matches
      )
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 992px)")
        .addEventListener('change', e => setMatches( e.matches ));
      }, []);



    if (!JSON.parse(localStorage.getItem("filterTopic"))) {
        const obj = {}
        for (let key of topics.TOPICS) {
            obj[key] = true
        }
        localStorage.setItem('filterTopic', JSON.stringify(obj))
    }

    if (!JSON.parse(localStorage.getItem("filterDuration"))) {
        const obj = {}
        for (let key of testDurations) {
            obj[key] = true
        }
        localStorage.setItem('filterDuration', JSON.stringify(obj))
    }

    if (!JSON.parse(localStorage.getItem("filterNumber"))) {
        const obj = {}
        for (let key of questionsNumber) {
            obj[key] = true
        }
        localStorage.setItem('filterNumber', JSON.stringify(obj))
    }

    const [checkedTopic, setCheckedTopic] = useState(JSON.parse(localStorage.getItem('filterTopic')));

    const [checkedDuration, setCheckedDuration] = useState(JSON.parse(localStorage.getItem('filterDuration')))

    const [checkedNumber, setCheckedNumber] = useState(JSON.parse(localStorage.getItem('filterNumber')))

    const [onUnfound, setOnUnfound] = useState("")


    // offcanvas 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // offcanvas

    const [tests, setTests] = useState({})

    const [allTests, setAllTests] = useState([])
    const [testList, setTestList] = useState([])

    const [modalShow, setModalShow] = useState(false)
    const [title, setTitle] = useState("")
    const [readyToStart, setReadyToStart] = useState(null)

    function filter(test) {
        setOnUnfound("Ничего не найдено")
        const topic = JSON.parse(localStorage.getItem('filterTopic'))
        const duration = JSON.parse(localStorage.getItem('filterDuration'))
        const number = JSON.parse(localStorage.getItem('filterNumber'))

        let avaibleTime = []
        for (let key in testDurationsStrToNums) {
            if (duration[key]) {
                avaibleTime.push(...testDurationsStrToNums[key])
            }
        }

        let avaibleNumber = []
        for (let key in questionsNumberStrToNum) {
            if (number[key]) {
                avaibleNumber.push(...questionsNumberStrToNum[key])
            }
        }

        return avaibleTime.indexOf(test.work_time) != -1 && topic[test.subject] && avaibleNumber.indexOf(test.question_count) != -1
    }


    function handleChangeTopic(t) {
        const newChecked = { ...checkedTopic }
        newChecked[t] = !checkedTopic[t]
        localStorage.setItem('filterTopic', JSON.stringify(newChecked))
        let newTestList = []
        for (let test of allTests) {
            if (filter(test)) {
                newTestList.push(test)
            }
        }
        setCheckedTopic(newChecked)
        setTestList(newTestList)
    }

    function handleChangeDuration(t) {
        //const email = JSON.parse(localStorage.getItem(""))

        const newChecked = { ...checkedDuration }

        newChecked[t] = !checkedDuration[t]
        localStorage.setItem('filterDuration', JSON.stringify(newChecked))
        let avaibleTime = []
        for (let key in testDurationsStrToNums) {
            if (newChecked[key]) {
                avaibleTime.push(...testDurationsStrToNums[key])
            }
        }

        let newTestList = []
        for (let test of allTests) {
            if (filter(test)) {
                newTestList.push(test)
            }
        }
        setCheckedDuration(newChecked)
        setTestList(newTestList)

    }

    function handleChangeNumber(t) {
        const newChecked = { ...checkedNumber }
        newChecked[t] = !checkedNumber[t]
        localStorage.setItem('filterNumber', JSON.stringify(newChecked))
        let newTestList = []
        for (let test of allTests) {
            if (filter(test)) {
                newTestList.push(test)
            }
        }
        setCheckedNumber(newChecked)
        setTestList(newTestList)
    }





    const apiUrl = `http://localhost:8000/api/v1/tests/`


    useEffect(() => {
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            setTests(serverData)


            const tests = serverData.data.items
            let testList = []
            for (let test of tests) {
                if (filter(test)) {
                    testList.push(test)
                }
            }
            setTestList(testList)
            setAllTests(serverData.data.items)
        })
    }, [])



    function handleTestStart(testID) {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
            if (JSON.parse(localStorage.getItem("testRunning")) != testID) {
                const apiUrl = `http://localhost:8000/api/v1/tests/create/new_attempt`;
                let config = {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
                    }
                }
                axios.post(apiUrl,
                    {
                        test_id: testID
                    },
                    config
                )

                    .then((resp) => {
                        const serverData = resp.data;
                        console.log(serverData)
                        localStorage.setItem("testTime", Math.floor(new Date(serverData.data.created_at).getTime() / 1000))
                        localStorage.setItem("answers", JSON.stringify(serverData.data.user_answers))
                        let test;
                        for (let item of testList) {
                            if (item.id == testID) {
                                test = item;
                            }
                        }
                        localStorage.setItem("testDuration", JSON.stringify(test.work_time * 60))
                        localStorage.setItem("testRunning", JSON.stringify(testID))
                        window.location.href = `http://localhost:3000/card/${testID}/1/`
                    })

            }
            else {
                alert("Вы уже проходите тест")
            }

        }
        else {
            alert("Для прохождения теста необходимо авторизоваться")
        }
    }



    const noneStyle = 'd-none'

    const normalStyle = "col-lg-6 col-xl-4 d-flex justify-content-center"

    //handleTestStart(test.id)

    if (!matches) {
        return (
            <div className="home-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <h1>Тесты</h1>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-12 d-flex justify-content-center">
                            <Button variant="primary" onClick={handleShow} className='w-50'>
                                Фильтр
                            </Button>

                            <Offcanvas show={show} onHide={handleClose}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>
                                        <div className='filter-info'>
                                            <h2>Фильтр</h2>
                                            <img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/50/horizontal-settings-mixer.png" alt="horizontal-settings-mixer" />
                                        </div></Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <div className='sidebar'>

                                        <div className='topic-wrapper'>
                                            <h4>Тема</h4>
                                            <ul>
                                                {topics.TOPICS.map(t => <li><Checkbox className="checkbox" checked={checkedTopic[t]} onChange={() => handleChangeTopic(t)} inputProps={{ 'aria-label': 'controlled' }} /> {t} </li>)}
                                            </ul>
                                        </div>
                                        <div className='duration-wrapper'>
                                            <h4>Длительность</h4>
                                            <ul>
                                                {testDurations.map(t => <li><Checkbox className="checkbox" checked={checkedDuration[t]} onChange={() => handleChangeDuration(t)} inputProps={{ 'aria-label': 'controlled' }} /> {t} </li>)}
                                            </ul>
                                        </div>
                                        <div className='number-wrapper'>
                                            <h4>Количество вопросов</h4>
                                            <ul>
                                                {questionsNumber.map(n => <li><Checkbox className="checkbox" checked={checkedNumber[n]} onChange={() => handleChangeNumber(n)} inputProps={{ 'aria-label': 'controlled' }} /> {n} </li>)}
                                            </ul>
                                        </div>

                                    </div>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </div>
                    </div>
                    <div className="row">

                        {testList.length > 0 ? testList.map((test) =>
                            <div className="col-12 col-md-6 d-flex justify-content-center home-card-wrap">
                                <Card className="card mb-4" style={{ maxWidth: '20rem', margin: 0, transitionDuration: 0.3}} onClick={() => {setTitle(test.title); setModalShow(true); setReadyToStart(test.id)}}>
                                    <Card.Img variant="top" src={test.picture ? "http://127.0.0.1:8000" + test.picture : "https://dev-education.apkpro.ru/media/news_image/e0d1d096-0f66-4cc9-a181-5cf9b2f27d9f.jpg"} />
                                    <Card.Body>
                                        <Card.Title className='card-title'>{test.title}</Card.Title>
                                        <Card.Text>
                                            <p className='card-text'>{test.description}</p>
                                        </Card.Text>
                                        <Card.Text>
                                            <div className='timeInfo'>
                                                <p>Время: {test.work_time} мин</p>
                                                <video autoPlay muted loop className='timeVideo'>
                                                    <source src="http://127.0.0.1:8080/wired-gradient-45-clock-time-hover-pinch.mp4" type="video/mp4" />
                                                </video>
                                            </div>

                                            <div className='questionsInfo'>
                                                <p>Количество вопросов: {test.question_count}</p>
                                                <video autoPlay muted loop className='timeVideo'>
                                                    <source src="http://127.0.0.1:8080/wired-outline-35-edit-hover-circle.mp4" type="video/mp4" />
                                                </video>
                                            </div>


                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            testName={title}
                                            onTestStart={() => handleTestStart(readyToStart)}
                                    />
                            </div>

                        ) : <h4>{onUnfound}</h4>}

                    </div>
                </div>
                 

                
            </div>
        )
    }


    //  ДРУГАЯ ВЕРСТКА
    //  ДРУГАЯ ВЕРСТКА
    //  ДРУГАЯ ВЕРСТКА
    //  ДРУГАЯ ВЕРСТКА
    //  ДРУГАЯ ВЕРСТКА

    

    else {
        return (
            <div className="home-wrapper-large">
                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-12 d-flex justify-content-center">
                            <h1>Тесты</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 col-xl-3">
                            <div className='sidebar'>
                                <div className='filter-info'>
                                    <h2>Фильтр</h2>
                                    <img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/50/horizontal-settings-mixer.png" alt="horizontal-settings-mixer" />
                                </div>

                                <div className='topic-wrapper'>
                                    <h4>Тема</h4>
                                    <ul>
                                        {topics.TOPICS.map(t => <li><Checkbox className="checkbox" checked={checkedTopic[t]} onChange={() => handleChangeTopic(t)} inputProps={{ 'aria-label': 'controlled' }} /> {t} </li>)}
                                    </ul>
                                </div>
                                <div className='duration-wrapper'>
                                    <h4>Длительность</h4>
                                    <ul>
                                        {testDurations.map(t => <li><Checkbox className="checkbox" checked={checkedDuration[t]} onChange={() => handleChangeDuration(t)} inputProps={{ 'aria-label': 'controlled' }} /> {t} </li>)}
                                    </ul>
                                </div>
                                <div className='number-wrapper'>
                                    <h4>Количество вопросов</h4>
                                    <ul>
                                        {questionsNumber.map(n => <li><Checkbox className="checkbox" checked={checkedNumber[n]} onChange={() => handleChangeNumber(n)} inputProps={{ 'aria-label': 'controlled' }} /> {n} </li>)}
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-8">
                            <div className="row">
                                {testList.length > 0 ? testList.map((test) =>
                                    <div className={normalStyle}>
                                        <Card className="card mb-4 home-card-wrap" style={{ maxWidth: '20rem', margin: 0 }} onClick={() => {setTitle(test.title); setModalShow(true); setReadyToStart(test.id)}}> 
                                            <Card.Img variant="top" src={test.picture ? "http://127.0.0.1:8000" + test.picture : "https://dev-education.apkpro.ru/media/news_image/e0d1d096-0f66-4cc9-a181-5cf9b2f27d9f.jpg"} />
                                            <Card.Body>
                                                <Card.Title className='card-title'>{test.title}</Card.Title>
                                                <Card.Text>
                                                    {test.description}
                                                </Card.Text>
                                                <Card.Text>
                                                    <div className='timeInfo'>
                                                        <p>Время: {test.work_time} мин</p>
                                                        <video autoPlay muted loop className='timeVideo'>
                                                            <source src="http://127.0.0.1:8080/wired-gradient-45-clock-time-hover-pinch.mp4" type="video/mp4" />
                                                        </video>
                                                    </div>

                                                    <div className='questionsInfo'>
                                                        <p>Количество вопросов: {test.question_count}</p>
                                                        <video autoPlay muted loop className='timeVideo'>
                                                            <source src="http://127.0.0.1:8080/wired-outline-35-edit-hover-circle.mp4" type="video/mp4" />
                                                        </video>
                                                    </div>


                                                </Card.Text>
                                            </Card.Body>
                                            
                                        </Card>
                                         
                                        
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            testName={title}
                                            onTestStart={() => handleTestStart(readyToStart)}
                                        />
                                    </div>
                                    

                                ) : <h4>{onUnfound}</h4>}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

}
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import './BasicScreen.css';
import { FilterSidebar } from '../Sidebar/Sidebar';
import { questionsNumberStrToNum, testDurationsStrToNums, topics } from '../Utils/constants';





function BasicScreen() {

    if (!JSON.parse(localStorage.getItem("testTopic"))) {
        localStorage.setItem("testTopic", JSON.stringify(topics.TOPICS))
    }

    const [topicList, setTopicList] = useState(JSON.parse(localStorage.getItem("testTopic")))
    const [buttonsClean, setButtonsClean] = useState(!topicList) //!topicList помощник нужен

    const [tests, setTests] = useState({})
    const [testList, setTestList] = useState([])





    const apiUrl = `http://localhost:8000/api/v1/tests/`;

    useEffect(() => {
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            setTests(serverData)
            setTestList(serverData.data.items)
        })

    }, [])





    function handleTestStart(testID) {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
            const apiUrl = `http://localhost:8000/api/v1/tests/create/new_attempt`;
            let config = {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("accessToken"))
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
                    console.log(serverData);
                    //localStorage.setItem("timeStart", JSON.stringify(parseInt((new Date(serverData.data.created_at).getTime() / 1000).toFixed(0))))
                    localStorage.setItem("answers", JSON.stringify(serverData.data.user_answers))
                })
        }
    }


    useEffect(() => {
        function beforeUnload(e) {
            //localStorage.removeItem("testTopic")
        }

        window.addEventListener('beforeunload', beforeUnload);

        return () => {
            window.removeEventListener('beforeunload', beforeUnload);
        };
    }, []);
    
    let filterButtonClasses = 'col-12 mb-4  d-flex justify-content-center'
    
    if (window.screen.width > 1000) {
        filterButtonClasses = 'col-3'
    }
    
    let displayList = []
    const filterTopic = JSON.parse(localStorage.getItem('filterTopic'))
    const filterDuration = JSON.parse(localStorage.getItem('filterDuration'))
    let filterDurationList = []
    for (let key in filterDuration) {
        if (filterDuration[key]) {
            filterDurationList.push(...testDurationsStrToNums[key])
        }
    }
    const filterNumber = JSON.parse(localStorage.getItem('filterNumber'))
    let filterNumberList = []
    for (let key in filterNumber) {
        if (filterNumber[key]) {
            filterNumberList.push(...questionsNumberStrToNum[key])
        }
    }
 
    for (let test of testList) {
        if (filterTopic[test.subject] && filterDurationList.indexOf(test.work_time) != -1 
    && filterNumberList.indexOf(test.question_count) != -1) {
        displayList.push(test)
    }
    }
     
    
    
    return (
        <div className='screen-wrapper'>
            <div className='test-start'>
                <div className='test-start-info'>
                    <h1>Тесты</h1>
                </div>

                <div className="container-fluid p-0 d-flex justify-content-center mt-5">
                    <div className='row col-12 p-1'>
                        <div className={'filter-wrapper ' + filterButtonClasses}><FilterSidebar breakpoint={1000} /></div>
                        <div className='card-container container col'>
                            <div className="row d-flex justify-content-center">
                                {displayList.map((test) =>
                                    <div className="card-wrapper-home col-10 col-md-6 col-xl-4 d-flex justify-content-center ">
                                        <Card className="card mb-4" style={{ width: '20rem', margin: 0 }} onClick={() => handleTestStart(test.id)}>
                                            <Card.Img variant="top" src="http://127.0.0.1:8080/1677481342_bronk-club-p-otkritki-tomas-kinkeid-instagram-25.jpg" />
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


                                    </div>




                                )}

                            </div>


                        </div>
                </div>

                </div>
            </div>
        </div>
    )
}

export default BasicScreen;

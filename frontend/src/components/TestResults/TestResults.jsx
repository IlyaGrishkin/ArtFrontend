import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { API_URLS, URLS } from '../Utils/constants';



export function TestResults() {
    const { testID } = useParams();
    const [result, setResult] = useState("Загрузка...");
    const [timeSpent, setTimeSpent] = useState('...')
    const [attemptID, setAttemptID] = useState(0)


    useEffect(() => {
        localStorage.removeItem("answers")
        localStorage.removeItem("testRunning")

        const apiUrl = API_URLS.GET_INFO;
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
                const serverData = resp.data;
                const current = serverData.data.user_attempts[0]
                console.log(serverData.data.user_attempts)
                console.log(current)
                setResult(`${current.total_score}/${current.question_count}`)
                setTimeSpent(current.time_spent)
                setAttemptID(current.attempt_id)
                

            })
            .catch(e => {
                window.location.href = URLS.HOME
            })





    }, [])

    return (
        <div>
            <h1>Ваш результат: {result}</h1>
            <h2>Время прохождения: {timeSpent}</h2>
            <a href={`/viewing/${attemptID}/1/`}>Просмотр</a>
        </div>
    )
}



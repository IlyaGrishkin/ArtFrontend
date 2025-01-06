import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { API_URLS } from '../Utils/constants';



export function TestResults() {
    const { testID } = useParams();
    const [result, setResult] = useState(JSON.parse(localStorage.getItem("testResult")) ? JSON.parse(localStorage.getItem("testResult")) : "Загрузка...");


    useEffect(() => {
        localStorage.removeItem("answers")
        localStorage.removeItem("testRunning")

        const apiUrl = API_URLS.GET_TEST_RESULT;
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
                console.log(serverData)
                localStorage.setItem("viewUserAnswers", JSON.stringify(serverData.data.user_answers))
                localStorage.setItem("viewCorrectAnswers", JSON.stringify(serverData.data.correct_answers))
                localStorage.setItem("viewQuestions", JSON.stringify(serverData.data.question_list))
                localStorage.setItem("testResult", JSON.stringify(serverData.data.total_score))
                setResult(serverData.data.total_score)

            })





    }, [])

    return (
        <div>
            <h1>Ваш результат: {result}</h1>
            <a href={`/viewing/${testID}/1/`}>Просмотр</a>
        </div>
    )
}



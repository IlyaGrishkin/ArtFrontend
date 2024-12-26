import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'



export function TestResults() {
    const { testID } = useParams();
    const [result, setResult] = useState(JSON.parse(localStorage.getItem("testResult")) ? JSON.parse(localStorage.getItem("testResult")) : "Загрузка...");


    useEffect(() => {
        localStorage.removeItem("answers")
        localStorage.removeItem("testRunning")

        const apiUrl = `http://localhost:8000/api/v1/tests/check/test`;
        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
            }
        }
        axios.post(apiUrl,
            {
                test_id: testID,
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



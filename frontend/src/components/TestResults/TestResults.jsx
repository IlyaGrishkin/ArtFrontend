import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'



export function TestResults() {
    const { testID } = useParams();
    const res = '10/10';
    localStorage.removeItem("answers")
    const apiUrl = `http://localhost:8000/api/v1/tests/check/test`;
    let config = {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("accessToken"))
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
        console.log(serverData);
        //localStorage.setItem("timeStart", JSON.stringify(parseInt((new Date(serverData.data.created_at).getTime() / 1000).toFixed(0))))
        //localStorage.setItem("answers", JSON.stringify(serverData.data.user_answers))
    })
    return (
        <div>
            <h1>{res}</h1>
            <a href={`/viewing/${testID}/1/`}>Просмотр</a>
        </div>
    )
}



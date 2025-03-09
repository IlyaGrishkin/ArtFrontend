import { useParams } from "react-router-dom";
import {getGuideCardData } from "../Utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

export function GuideCard(props) {
    const [data, setData] = useState([])
    const {id} = useParams()
    useEffect(() => {
        const apiUrl = getGuideCardData(id)
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            setData(serverData.data)
        })
        .catch(resp => {
            console.log(resp)
        })
    }, [])
    return (
        <div>
            <h1>{data.subject}</h1>
            <h3>{data.title}</h3>
            <p>{data.text}</p>
            
        </div>
    )
}
import { useEffect, useState } from "react";
import { GuideCardPreview } from "../GuideCardPreview/GuideCardPreview";
import axios from "axios";
import { API_URLS, SERVER_HOST } from "../Utils/constants";

export function GuideCardScreen(){
    const [data, setData] = useState([])
    useEffect(() => {
        const apiUrl = API_URLS.GET_ALL_CARDS
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            setData(serverData.data.items)
        })
        .catch(resp => {
            console.log(resp)
        })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                {data.map(item => 
                    <div className="col-12 col-lg-5 my-4">
                    <GuideCardPreview image={SERVER_HOST + item.picture}
                    title={item.title}
                    text={item.text}
                    id={item.id}
                    />
                </div>

                )} 
            </div>
        </div>
    )
}
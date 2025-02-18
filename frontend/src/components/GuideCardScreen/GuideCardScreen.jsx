import { useEffect, useState } from "react";
import { GuideCardPreview } from "../GuideCardPreview/GuideCardPreview";
import axios from "axios";

export function GuideCardScreen(){
    const [data, setData] = useState({})
    useEffect(() => {
        const apiUrl = `http://localhost:8000/api/v1/guide/`
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
        })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-5 my-4">
                    <GuideCardPreview image={"https://avatars.mds.yandex.net/i?id=9b217274b91aea53d30e5f6b54261c2c_l-9146178-images-thumbs&n=13"}
                    title={'Тестовое название'}
                    text={'lorem ipsum dolor set amit Que Dollar jois um alet gauden'}
                    />
                </div>
                <div className="col-12 col-lg-5 my-4">
                    <GuideCardPreview image={"https://avatars.mds.yandex.net/i?id=9b217274b91aea53d30e5f6b54261c2c_l-9146178-images-thumbs&n=13"}
                    title={'Тестовое название'}
                    text={'lorem ipsum dolor set amit Que Dollar jois um alet gauden'}
                    />
                </div>
                 
            </div>
        </div>
    )
}
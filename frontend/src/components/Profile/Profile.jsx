import axios from "axios";
import { useEffect, useState } from "react";


export function Profile() {
    const [avatar, setAvatar] = useState("")
    const [email, setEmail] = useState("")
    const [regDate, setRegDate] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        const apiUrl = `http://localhost:8000/api/v1/customers/get_info`;
        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
            }
        }
        axios.post(apiUrl,
            {},
            config
        )
        .then(resp => {
            const serverData = resp.data;
            console.log(serverData)
            setAvatar("http://localhost:8000" + serverData.data.avatar_path)
            setEmail(serverData.data.user_email)
            setRegDate(serverData.data.user_created_at)
            setName(serverData.data.user_name)
        })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-12 col-md-5">
                    <img style={{maxWidth: 100 + "%", borderRadius: 4 + "%"}} src={avatar}/>
                </div>
                <div className="col-12 col-md-7 mt-5">
                    <h2 className="mb-4">{name}</h2>
                    <h5 className="mb-4">{email}</h5>
                    <h5>{regDate}</h5>
                </div>
            </div>
        </div>
    )
}
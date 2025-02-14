import axios from "axios";
import { useEffect, useState } from "react";


export function Profile() {
    const [avatar, setAvatar] = useState("")
    const [email, setEmail] = useState("")
    const [regDate, setRegDate] = useState("")
    const [name, setName] = useState("")
    const [testList, setTestList] = useState([])
    const [noToken, setNoToken] = useState(false)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
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
                const date = new Date(serverData.data.user_created_at)
                setRegDate(`${date.getDate().toString().length == 1 ? '0' + date.getDate().toString() : date.getDate()}.${parseInt(date.getMonth()) + 1}.${date.getFullYear()}`)
                setName(serverData.data.user_name)
                setTestList(serverData.data.user_attempts)
                console.log(serverData.data.user_attempts)
            })

            }
        else {
            setNoToken(true)
        }
        
    }, [])
    if (noToken) {
        window.location.href = "http://localhost:3000/signup/"
    }
    else {
        return (
            <div className="container-fluid">
                <div className="row mt-5 d-flex justify-content-between">
                    <div className="col-12 col-md-5">
                        <img style={{maxWidth: 100 + "%", borderRadius: 4 + "%"}} src={avatar}/>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <h2 className="mb-4">{name}</h2>
                        <h5 className="mb-4">{email}</h5>
                        <h5>{regDate}</h5>
                    </div>
                </div>
                <div className="row">
                {testList.map(test => 
                <div>
                    <p>{test.total_score}</p>
                </div>
                    
    )}
                </div>
            </div>   
        )
    }
    
}
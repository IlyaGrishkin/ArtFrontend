import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { API_URLS, SERVER_HOST, URLS } from "../Utils/constants";


export function Profile() {
    const [avatar, setAvatar] = useState("")
    const [email, setEmail] = useState("")
    const [regDate, setRegDate] = useState("")
    const [name, setName] = useState("")
    const [testList, setTestList] = useState([])
    const [runningTest, setRunningTest] = useState(false)
    const [noToken, setNoToken] = useState(false)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
            const apiUrl = API_URLS.GET_INFO;
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
                setAvatar(SERVER_HOST + serverData.data.avatar_path)
                setEmail(serverData.data.user_email)
                const date = new Date(serverData.data.user_created_at)
                setRegDate(`${date.getDate().toString().length == 1 ? '0' + date.getDate().toString() : date.getDate()}.${parseInt(date.getMonth()) + 1}.${date.getFullYear()}`)
                setName(serverData.data.user_name)
                setTestList(serverData.data.user_attempts.slice(0, 10))
                console.log(serverData.data.user_attempts.slice(0, 10))
            })
            .catch(resp => {
                console.log(resp)
            })

            }
        else {
            setNoToken(true)
        }
        
    }, [])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("accessToken"))) {
            const apiUrl = API_URLS.GET_TEST_SESSION;
            let config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
                }
            }
            axios.get(apiUrl,
                config
            )
            .then(resp => {
                const serverData = resp.data;
                setRunningTest(serverData.data.test_id)
            })
            .catch(resp => {
                console.log(resp)
            })

            }
       
        
    }, [])

    let dataSource = []

    for (let obj of testList) {
        let newObj = {}
        newObj.result = <a href={`/viewing/${obj.attempt_id}/1/`}>{`${obj.total_score}/${obj.question_count}`}</a>
        newObj.test = obj.test_title
        newObj.timeSpent = obj.time_spent
        const date = new Date(obj.end_time)   
        newObj.endTime = `${date.getDate().toString().length == 1 ? '0' + date.getDate().toString() : date.getDate()}.${parseInt(date.getMonth()) + 1}.${date.getFullYear()}`
        dataSource.push(newObj)
    }


        
      const columns = [
        {
          title: 'Результат',
          dataIndex: 'result',
          key: 'result',
        },
        {
          title: 'Тест',
          dataIndex: 'test',
          key: 'test',
        },
        {
          title: 'Время прохождения',
          dataIndex: 'timeSpent',
          key: 'timeSpent',
        },
        {
            title: 'Дата прохождения',
            dataIndex: 'endTime',
            key: 'endTime',
          },
      ];
      
      

    if (noToken) {
        window.location.href = URLS.SIGNUP
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
                 
                </div>
                <Table dataSource={dataSource} columns={columns} pagination={false}/>

                <a className="btn btn-danger" href="/logout/">Выйти</a>
                {runningTest && <a className="btn btn-success" href={`/card/${runningTest}/1/`}>Продожить попытку</a>}
            </div>   
        )
    }
    
}
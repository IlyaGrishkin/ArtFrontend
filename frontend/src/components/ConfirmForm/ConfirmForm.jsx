import React, { useEffect, useRef, useState } from 'react';
import './ConfirmForm.css';
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material';
import { API_URLS, CLIENT_HOST } from '../Utils/constants';



function ConfirmForm(props) {
    // если передан props.apiUrl - создание юзера
    const [loading, setLoading] = useState(false)
    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

        return [htmlElRef, setFocus]
    }
    const [inputRef1, setInputFocus1] = useFocus()
    const [inputRef2, setInputFocus2] = useFocus()
    const [inputRef3, setInputFocus3] = useFocus()
    const [inputRef4, setInputFocus4] = useFocus()
    const [inputRef5, setInputFocus5] = useFocus()
    const [inputRef6, setInputFocus6] = useFocus()

    const [num1, setNum1] = useState("")
    const [num2, setNum2] = useState("")
    const [num3, setNum3] = useState("")
    const [num4, setNum4] = useState("")
    const [num5, setNum5] = useState("")
    const [num6, setNum6] = useState("")

    const [code, setCode] = useState([-1, -1, -1, -1, -1, -1])

    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    const userEmail = JSON.parse(localStorage.getItem("userEmail"))

    async function sendData() {
        let s = code.join("");
        const email = JSON.parse(localStorage.getItem('userEmail'))
        console.log(email)
        const apiUrl = props.apiUrl ? props.apiUrl : API_URLS.GET_CONFIRM
        const defaultData = {
            email: email,
            code: s
        }
        const createData = {
            first_name: JSON.parse(localStorage.getItem('userFirstName')),
            last_name: JSON.parse(localStorage.getItem("userLastName")),
            email: email,
            code: s,
        }
        await axios.post(apiUrl,
            props.apiUrl ? createData : defaultData
        )

            .then((resp) => {
                const serverData = resp.data;
                console.log(serverData)
                const accessToken = serverData.data.access_token
                const refreshToken = serverData.data.refresh_token
                const expires = serverData.data.expires_in
                localStorage.setItem('accessToken', JSON.stringify(accessToken))
                localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
                localStorage.setItem('expires', JSON.stringify(expires))
                window.location.href = CLIENT_HOST
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
                setCode([-1, -1, -1, -1, -1, -1])
                setNum1("")
                setNum2("")
                setNum3("")
                setNum4("")
                setNum5("")
                setNum6("")
                setInputFocus1()
                alert('Неверный код')


            })
    }   

    useEffect(() => {
        if (code.indexOf(-1) == -1) {
            setLoading(true)
            sendData()
            

        }
    }, [code])

    function handleChange(e, index) {
        if (index == '1') {
            let flag = false;
            if (e.target.value.length <= 1) {
                if (digits.indexOf(e.target.value) != -1) {
                    setNum1(e.target.value)
                    flag = true
                }

            }
            if (flag) {
                setInputFocus2()
            }
            if (flag) {
                let newCode = code.slice()
                newCode[parseInt(index) - 1] = e.target.value;
                setCode(newCode)
            }

        }
        else if (index == '2') {
            let flag = false;
            if (e.target.value.length <= 1) {
                if (digits.indexOf(e.target.value) != -1) {
                    setNum2(e.target.value)
                    flag = true;
                }

            }
            if (flag) {
                setInputFocus3()
            }
            if (flag) {
                let newCode = code.slice()
                newCode[parseInt(index) - 1] = e.target.value;
                setCode(newCode)
            }

        }
        else if (index == '3') {
            let flag = false;
            if (e.target.value.length <= 1) {
                if (digits.indexOf(e.target.value) != -1) {
                    setNum3(e.target.value)
                    flag = true;
                }
            }
            if (flag) {
                setInputFocus4()
            }
            if (flag) {
                let newCode = code.slice()
                newCode[parseInt(index) - 1] = e.target.value;
                setCode(newCode)
            }

        }
        else if (index == '4') {
            let flag = false;
            if (e.target.value.length <= 1) {
                if (digits.indexOf(e.target.value) != -1) {
                    setNum4(e.target.value)
                    flag = true;
                }
            }
            if (flag) {
                setInputFocus5()
            }
            if (flag) {
                let newCode = code.slice()
                newCode[parseInt(index) - 1] = e.target.value;
                setCode(newCode)
            }

        }
        else if (index == '5') {
            let flag = false;
            if (e.target.value.length <= 1) {
                if (digits.indexOf(e.target.value) != -1) {
                    setNum5(e.target.value)
                    flag = true;
                }
            }
            if (flag) {
                setInputFocus6()
            }
            if (flag) {
                let newCode = code.slice()
                newCode[parseInt(index) - 1] = e.target.value;
                setCode(newCode)
            }

        }
        else if (index == '6') {
            let flag = false;
            if (e.target.value.length <= 1) {
                if (digits.indexOf(e.target.value) != -1) {
                    setNum6(e.target.value)
                    flag = true

                }
            }
            if (flag) {
                let newCode = code.slice()
                newCode[parseInt(index) - 1] = e.target.value;
                setCode(newCode)
            }


        }


    }

    function handleKey(e, index) {
        if (e.code == "Backspace") {
            if (index == "1") {
                setNum1("")
            }
            else if (index == "2") {
                setNum2("")
            }
            else if (index == "3") {
                setNum3("")
            }
            else if (index == "4") {
                setNum4("")
            }
            else if (index == "5") {
                setNum5("")
            }
            else if (index == "6") {
                setNum6("")
            }
        }
    }


    return (
        <div className='screen-wrapper'>
            <div className='info'>
                <h2>Проверьте свой почтовый ящик</h2>
                <p>Мы отправили письмо c кодом подтверждения на адрес {userEmail}</p>
            </div>
            <div className='code-wrapper'>
                <input ref={inputRef1} type="text" class="form-control num-item" value={num1} onChange={e => handleChange(e, '1')} onKeyDown={e => handleKey(e, '1')} pattern="\d+" />
                <input ref={inputRef2} type="text" class="form-control num-item" value={num2} onChange={e => handleChange(e, '2')} onKeyDown={e => handleKey(e, '2')} pattern="\d+" />
                <input ref={inputRef3} type="text" class="form-control num-item" value={num3} onChange={e => handleChange(e, '3')} onKeyDown={e => handleKey(e, '3')} pattern="\d+" />
                <input ref={inputRef4} type="text" class="form-control num-item" value={num4} onChange={e => handleChange(e, '4')} onKeyDown={e => handleKey(e, '4')} pattern="\d+" />
                <input ref={inputRef5} type="text" class="form-control num-item" value={num5} onChange={e => handleChange(e, '5')} onKeyDown={e => handleKey(e, '5')} pattern="\d+" />
                <input ref={inputRef6} type="text" class="form-control num-item" value={num6} onChange={e => handleChange(e, '6')} onKeyDown={e => handleKey(e, '6')} pattern="\d+" />
            </div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
                onClick={null}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default ConfirmForm;
import React, { useEffect, useState } from 'react';
import {Carousel} from 'react-bootstrap';
//import ExampleCarouselImage from 'components/ExampleCarouselImage';
import './LoginForm.css';
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material';
import { API_URLS, URLS } from '../Utils/constants';



function LoginForm(props) {
    const [email, setEmail] = useState("")
    const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState("email не может быть пустым")
    const [formValid, setFormValid] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (emailError) {
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    }, [emailError])

    function handleChange(e) {
        setEmail(e.target.value)
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(String(e.target.value).toLowerCase())) {
            String(e.target.value).length == 0 ? setEmailError("email не может быть пустым") : setEmailError("Некорректный email")
        }
        else {
            setEmailError("")
        }


    }

    function handleBlur(e) {
        setEmailDirty(true);
    }

    async function handleSubmit(event) {
        if (formValid) {
            setLoading(true)
            event.preventDefault()
            localStorage.setItem("userEmail", JSON.stringify(email))
            const apiUrl = API_URLS.GET_SEND_CODE;
            await axios.post(apiUrl, 
                {
                    email: email
                }
            )
            
            .then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            window.location.href = URLS.LOGIN_CHECK;
            })
            .catch(resp => {
                console.log(resp)
            })
            
            
            
        }
        event.preventDefault()
    }

    return (
        <div className='login-form-wrapper'>
            <div className='wrapper'>
                <div className='login-info'>
                     
                        <Carousel slide={false}>
                            <Carousel.Item>
                            <img className="" src="http://127.0.0.1:8080/i.webp"/>
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                            <img src="http://127.0.0.1:8080/zhivopis_holst_iskusstvo_60857_1920x1080.jpg"/>
                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="http://127.0.0.1:8080/1677481342_bronk-club-p-otkritki-tomas-kinkeid-instagram-25.jpg"/>
                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                    </p>
                                
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                     
                </div>

                <div className='form-wrap'>
                    <div className='login-msg'>
                        <h2>Вход</h2>
                    </div>
                    
                    <form className='login-form' onSubmit={handleSubmit} noValidate={true}>
                        <label htmlFor="email"><p>Введите свой email</p></label>
                        <input className="form-control my-2" value={email} onChange={e => handleChange(e)} onBlur={e => handleBlur(e)} id="email"
                            type="email" name="emailAddress" placeholder='Ваша почта' />
                        {(emailError && emailDirty) ? <div style={{ color: "red" }}>{emailError}</div> : <></>}
                        <button type="submit" className={formValid ? 'btn btn-success w-100 my-2' : 'btn btn-success disabled w-100 my-2'}>Отправить</button>
                    </form>
                    <div className='create-account'>
                        <p>Нет аккаунта? <a href="/signup/">Зарегистрироваться</a></p>
                    </div>
                </div>
                
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

export default LoginForm;
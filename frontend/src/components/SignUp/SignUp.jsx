import { Backdrop, CircularProgress } from "@mui/material"
import axios from "axios"
import { useState } from "react"


export function SignUp() {
    const [email, setEmail] = useState("")
    const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState("email не может быть пустым")

    const [firstName, setFirstName] = useState("")

    const [secondName, setSecondName] = useState("")

    const [formValid, setFormValid] = useState(true)
    const [loading, setLoading] = useState(false)

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


    function handleNameChange(e) {
        setFirstName(e.target.value)
    }

    function handleSecondNameChange(e) {
        setSecondName(e.target.value)
    }

    async function handleSubmit(event) {
        if (formValid) {
            setLoading(true)
            event.preventDefault()
            localStorage.setItem("userEmail", JSON.stringify(email))
            const apiUrl = `http://localhost:8000/api/v1/customers/create_and_auth`;
            await axios.post(apiUrl, 
                {
                    email: email,
                    first_name: firstName,
                    last_name: secondName
                }
            )
            
            .then((resp) => {
            const serverData = resp.data;
            console.log(serverData)
            });
            window.location.href = "http://localhost:3000/signup/confirm/"
            
        }
        event.preventDefault()
    }

    return (
        <div className="container-fluid my-5">
            <div className="row my-5 d-flex justify-content-center">
                <div className="col-12 col-md-6 d-flex justify-content-center">
                    <form onSubmit={handleSubmit} noValidate={true}>
                        <label className="p-0 m-0" htmlFor="email">email</label>
                        <input className="form-control m-0" value={email} onChange={e => handleChange(e)} onBlur={e => handleBlur(e)} id="email"
                            type="email" name="emailAddress" placeholder='Ваша почта' />
                        {(emailError && emailDirty) ? <div style={{ color: "red" }}>{emailError}</div> : <></>}

                        <label className="mt-4" htmlFor="firstName">Имя</label>
                        <input className="form-control m-0" value={firstName} onChange={e => handleNameChange(e)}/>

                        <label className="mt-4" htmlFor="firstName">Фамилия</label>
                        <input className="form-control m-0" value={secondName} onChange={e => handleSecondNameChange(e)}/>
                        <button type="submit" className="btn btn-primary mt-4">Создать аккаунт</button>
                    </form>
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
    )
}
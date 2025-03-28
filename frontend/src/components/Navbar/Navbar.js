import React, { useEffect, useMemo, useState } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import './Navbar.css'
import { Avatar } from '@mui/material';
import axios from 'axios';
import { API_URLS, SERVER_HOST } from '../Utils/constants';
import { AnimatedLink } from '../AnimatedLink/AnimatedLink';
import { StyledBadge } from '../StyledBadge/StyledBadge';



function AppNavbar() {

  const [avatar, setAvatar] = useState(JSON.parse(localStorage.getItem('avatar')) ? JSON.parse(localStorage.getItem('avatar')) : "")

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 992px)").matches
  )

  const [showBadge, setShowBadge] = useState(false)

  useEffect(() => {
    window
    .matchMedia("(min-width: 992px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  useEffect(() => {
    const profileInfo = API_URLS.GET_INFO
    if (JSON.parse(localStorage.getItem("accessToken"))) {

      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
        }
      }

      axios.post(profileInfo,
        {},
        config
      )

        .then(resp => {
          const serverData = resp.data;
          console.log(serverData)
          localStorage.setItem("avatar", JSON.stringify(SERVER_HOST + serverData.data.avatar_path))
          setAvatar(SERVER_HOST + serverData.data.avatar_path)
           
          
        })
        .catch(e => {
          console.log(e)
        })
      
      
    }

  }, [])

  useEffect(() => {
    const apiUrl = API_URLS.GET_TEST_SESSION
    if (JSON.parse(localStorage.getItem("accessToken"))) {
        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
            }
        }
        axios.get(apiUrl, config).then((resp) => {
            const serverData = resp.data;
            setShowBadge(true)
            console.log('run', serverData)
            })

    .catch(resp => {})
      setShowBadge(false)
    }
    

    }, [])

  const smallScreenStyles = 'mx-2 my-navbar-link d-flex justify-content-center border rounded-3 mb-3'
  const bigScreenStyles = 'mx-2 my-navbar-link'

  const profileSmallScreenStyles = 'mx-2 my-navbar-link d-flex justify-content-center'

  const loginButtonSmallScreenStyles = 'mx-2 my-navbar-link d-flex justify-content-center border rounded-3 mb-3 text-white bg-black'

  

  return (
    <>
    
      <Navbar expand={'lg'} className="mb-3 bg-transparent border-bottom">
          <Container fluid>
            <Navbar.Brand className='my-navbar-brand ps-3'>Русское искусство <br/> и наследие</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${'lg'}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
              placement="end"
              
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`}>
                   Навигация
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <AnimatedLink href="/" text={"Главная"} styles={`${matches ? bigScreenStyles : smallScreenStyles}`}/>
                  <AnimatedLink href="/" text={"Тесты"} styles={`${matches ? bigScreenStyles : smallScreenStyles}`}/>
                  <AnimatedLink href="/guide-cards/" text={"Гайд-карточки"} styles={`${matches ? bigScreenStyles : smallScreenStyles}`}/>
                  <AnimatedLink href="/about/" text={"О проекте"} styles={`${matches ? bigScreenStyles : smallScreenStyles}`}/>
                  <span class="border-start ms-3" style={{width: '2px'}}></span>
                  {avatar ? <a href='/profile/' className={`${matches ? "ms-4" : profileSmallScreenStyles}`}>
                  {showBadge ? <StyledBadge overlap="circular"
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                 variant="dot">
                    <Avatar src={avatar}/></StyledBadge> :
                    <Avatar src={avatar}/>
                    } </a> :
                    <AnimatedLink href="/login/" text={"Войти"} styles={`${matches ? bigScreenStyles + ' navbar-login-button ms-4' : loginButtonSmallScreenStyles} `} />
                    }
                </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

      
       

      
    </>
  );
}


 
export default AppNavbar;
import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Offcanvas } from 'react-bootstrap';
import './Navbar.css'
import { Avatar } from '@mui/material';
import axios from 'axios';
import { BootstrapBreakpoints } from '../Utils/constants';
import { sendRequest } from '../../tools/lookups';
import { AnimatedLink } from '../AnimatedLink/AnimatedLink';



function AppNavbar() {

  const [avatar, setAvatar] = useState("")

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 992px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 992px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  useEffect(() => {
    const profileInfo = `http://localhost:8000/api/v1/customers/get_info`
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
          localStorage.setItem("avatar", JSON.stringify("http://localhost:8000" + serverData.data.avatar_path))
          setAvatar("http://localhost:8000" + serverData.data.avatar_path)
        })
        .catch(e => {
          console.log(e)
        })
      
      
    }

  }, [])

  const smallScreenStyles = 'mx-2 my-navbar-link d-flex justify-content-center border rounded-3 mb-3'
  const bigScreenStyles = 'mx-2 my-navbar-link'

  const profileSmallScreenStyles = 'mx-2 my-navbar-link d-flex justify-content-center'

  const loginButtonSmallScreenStyles = 'mx-2 my-navbar-link d-flex justify-content-center border rounded-3 mb-3 bg-black text-beige'

  

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
                  {avatar ? <a href='/profile/' className={`${matches ? "" : profileSmallScreenStyles}`}><Avatar src={avatar}/></a> :
                    <Nav.Link href="/login/" className={`${matches ? 'login-button rounded-pill' : loginButtonSmallScreenStyles} `}><p className={`${matches ? 'mx-3' : 'mx-0'} my-0`}>Войти</p></Nav.Link>
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
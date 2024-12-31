import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Offcanvas } from 'react-bootstrap';
import './Navbar.css'
import { Avatar } from '@mui/material';
import axios from 'axios';
import { BootstrapBreakpoints } from '../Utils/constants';


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
  return (
    <>
    
      <Navbar expand={'lg'} className="mb-3 bg-transparent border-bottom">
          <Container fluid>
            <Navbar.Brand className='my-navbar-brand'>Русское искусство <br/> и наследие</Navbar.Brand>
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
                  <Nav.Link href="#action1" className='mx-2 my-navbar-link'>Главная</Nav.Link>
                  <Nav.Link href="#action2" className='mx-2 my-navbar-link'>Тесты</Nav.Link>
                  <Nav.Link href="#action3" className='mx-2 my-navbar-link'>Гайд-карточки</Nav.Link>
                  <Nav.Link href="#action4" className='mx-2 my-navbar-link'>О проекте</Nav.Link>
                  <Nav.Link href="#action5" className={`${matches ? 'login-button' : 'my-navbar-link'} mx-2`}><p className={`${matches ? 'mx-3' : 'mx-0'} my-0`}>Войти</p></Nav.Link>
                </Nav>
  
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

       

      
    </>
  );
}


//<Nav.Item><audio style={{height: 30 + "px", marginTop: 6 + 'px'}} controls src='http://192.168.0.112:8080/%D0%A5%D0%BE%D1%80_%D0%A1%D1%80%D0%B5%D1%82%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%9C%D0%BE%D0%BD%D0%B0%D1%81%D1%82%D1%8B%D1%80%D1%8F_%D0%9F%D1%80%D0%B0%D0%B2%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D0%B8%D0%B5_%D0%98%D0%B7_%D0%9A_%D0%A4_%D0%9F%D1%80%D0%BE%D0%B1%D1%83%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_.mp3/'></audio></Nav.Item>
export default AppNavbar;
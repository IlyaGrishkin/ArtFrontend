import React from 'react';
import {Navbar, Container, Nav } from 'react-bootstrap';
import './Navbar.css'
import { Avatar } from '@mui/material';


function AppNavbar() {
    return (
      <>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
          
           
          <Nav.Link href="/profile/" className='avatar'>
            <Avatar src="https://avatars.mds.yandex.net/i?id=b8dd7d668d87124fe43353f8ddb108d5_l-5023807-images-thumbs&n=13"/>
          </Nav.Link>
          
            
          
          
         
        </Navbar>
             

      </>
    );
  }
  

//<Nav.Item><audio style={{height: 30 + "px", marginTop: 6 + 'px'}} controls src='http://192.168.0.112:8080/%D0%A5%D0%BE%D1%80_%D0%A1%D1%80%D0%B5%D1%82%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%9C%D0%BE%D0%BD%D0%B0%D1%81%D1%82%D1%8B%D1%80%D1%8F_%D0%9F%D1%80%D0%B0%D0%B2%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D0%B8%D0%B5_%D0%98%D0%B7_%D0%9A_%D0%A4_%D0%9F%D1%80%D0%BE%D0%B1%D1%83%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5_.mp3/'></audio></Nav.Item>
export default AppNavbar;
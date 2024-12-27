import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppCard from './components/Card/Card';
import AppNavbar from './components/Navbar/Navbar';
import MainScreen from './components/MainScreen/MainScreen';

import TestNavbar from './components/TestNavbar/TestNavbar';
import { TestResults } from './components/TestResults/TestResults';
import { ViewingCard } from './components/ViewingCard/ViewingCard';
import LoginForm from './components/LoginForm/LoginForm';
import ConfirmForm from './components/ConfirmForm/ConfirmForm';
import BasicScreen from './components/BasicScreen/BasicScreen';
import Timer from './components/Timer/Timer';
import TestScreen from './components/TestScreen/TestScreen';
import { Home } from './components/Home/Home';
import { handleToken } from './tools/lookups';
import { Logout } from './components/Logout/Logout';
 








const App = () => {
  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <AppNavbar/>
        
          <Routes>
              <Route path="/" element={<Home/>} />

              <Route path="/card/:testID/:id" element={
                <TestScreen/>
              } />
              
              <Route path="/:testID/results/" element={
                <TestResults/>
                } />
              <Route path="/viewing/:testID/:id/" element={
          
                    <ViewingCard/>
      
                }/>
              <Route path="/login/" element={<LoginForm/>}/>
              <Route path="/login/check/" element={<ConfirmForm/>}/>
              <Route path="/main/" element={<BasicScreen/>}/>
              <Route path="/timer/" element={<Timer/>}/>
              <Route path="/logout/" element={<Logout/>}/>

              


          </Routes>
       
      </BrowserRouter>
      
     </div>
   
 
    
  );
}



export default App;
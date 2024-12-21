import { Checkbox } from '@mui/material'
import { questionsNumber, testDurations, topics } from '../Utils/constants'
import './Sidebar.css'
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


export function FilterSidebar(props) {

    if (!JSON.parse(localStorage.getItem("filterTopic"))) {
        const obj = {}
        for (let key of topics.TOPICS) {
            obj[key] = true
        }
        localStorage.setItem('filterTopic', JSON.stringify(obj))
    }
    
    if (!JSON.parse(localStorage.getItem("filterDuration"))) {
        const obj = {}
        for (let key of testDurations) {
            obj[key] = true
        }
        localStorage.setItem('filterDuration', JSON.stringify(obj))
    }
    
    if (!JSON.parse(localStorage.getItem("filterNumber"))) {
        const obj = {}
        for (let key of questionsNumber) {
            obj[key] = true
        }
        localStorage.setItem('filterNumber', JSON.stringify(obj))
    }
    
    const [checkedTopic, setCheckedTopic] = useState(JSON.parse(localStorage.getItem('filterTopic')));

    const [checkedDuration, setCheckedDuration] = useState(JSON.parse(localStorage.getItem('filterDuration')))

    const [checkedNumber, setCheckedNumber] = useState(JSON.parse(localStorage.getItem('filterNumber')))



    // offcanvas 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    // offcanvas

    function handleChangeTopic(t) {
        const newChecked = {...checkedTopic}
        newChecked[t] = !checkedTopic[t]
        localStorage.setItem('filterTopic', JSON.stringify(newChecked))
        setCheckedTopic(newChecked)
      
    }

    function handleChangeDuration(t) {
        const newChecked = {...checkedDuration}
        newChecked[t] = !checkedDuration[t]
        localStorage.setItem('filterDuration', JSON.stringify(newChecked))
        setCheckedDuration(newChecked)
      
    }
    
    function handleChangeNumber(t) {
        const newChecked = {...checkedNumber}
        newChecked[t] = !checkedNumber[t]
        localStorage.setItem('filterNumber', JSON.stringify(newChecked))
        setCheckedNumber(newChecked)
    }

    const width = window.screen.width;

    if (width >= props.breakpoint) {
        return (
            <div className='sidebar'>
                <div className='filter-info'>
                    <h2>Фильтр</h2>
                    <img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/50/horizontal-settings-mixer.png" alt="horizontal-settings-mixer" />
                </div>
    
                <div className='topic-wrapper'>
                    <h4>Тема</h4>
                    <ul>
                        {topics.TOPICS.map(t => <li><Checkbox className="checkbox" checked={checkedTopic[t]} onChange={() => handleChangeTopic(t)} inputProps={{ 'aria-label': 'controlled' }} /> {t} </li>)}
                    </ul>
                </div>
                <div className='duration-wrapper'>
                    <h4>Длительность</h4>
                    <ul>
                        {testDurations.map(t => <li><Checkbox className="checkbox" checked={checkedDuration[t]} onChange={() => handleChangeDuration(t)} inputProps={{ 'aria-label': 'controlled' }} /> {t} </li>)}
                    </ul>
                </div>
                <div className='number-wrapper'>
                    <h4>Количество вопросов</h4>
                    <ul>
                        {questionsNumber.map(n => <li><Checkbox className="checkbox" checked={checkedNumber[n]} onChange={() => handleChangeNumber(n)} inputProps={{ 'aria-label': 'controlled' }} /> {n} </li>)}
                    </ul>
                </div>
    
            </div>
        )

    } 
    else {
        return (
            <>
      <Button variant="primary" onClick={handleShow} className='w-50'>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
                <div className='filter-info'>
                    <h2>Фильтр</h2>
                    <img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/50/horizontal-settings-mixer.png" alt="horizontal-settings-mixer" />
                </div></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='sidebar'>

                <div className='topic-wrapper'>
                    <h4>Тема</h4>
                    <ul>
                        {topics.TOPICS.map(t => <li><Checkbox className="checkbox" checked={checkedTopic[t]} onChange={() => handleChangeTopic(t)} inputProps={{ 'aria-label': 'controlled' }} /> {t} </li>)}
                    </ul>
                </div>
                <div className='duration-wrapper'>
                    <h4>Длительность</h4>
                    <ul>
                        {testDurations.map(t => <li><Checkbox className="checkbox" checked={checkedDuration[t]} onChange={() => handleChangeDuration(t)} inputProps={{ 'aria-label': 'controlled' }} /> {t} </li>)}
                    </ul>
                </div>
                <div className='number-wrapper'>
                    <h4>Количество вопросов</h4>
                    <ul>
                        {questionsNumber.map(n => <li><Checkbox className="checkbox" checked={checkedNumber[n]} onChange={() => handleChangeNumber(n)} inputProps={{ 'aria-label': 'controlled' }} /> {n} </li>)}
                    </ul>
                </div>
    
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
        )
    }
    
}
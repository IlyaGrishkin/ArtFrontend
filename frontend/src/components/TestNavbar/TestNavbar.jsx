import React from 'react';
import './TestNavbar.css'
import { Button } from 'react-bootstrap';

import { useParams } from 'react-router-dom';




function TestNavbar(props) {
    const questions_quantity = props.questions_quantity;
    const { id } = useParams();
    const completed = props.completed;
    console.log('completed', completed)
    const { testID } = useParams();
    const {attemptID} = useParams()
    let baseID = testID;
    if (props.viewing) {
        baseID = attemptID
    }

    let urlBase = 'card'
    if (props.viewing)  {
        urlBase = 'viewing'
    }

    let arr = [];

    for (let i = 1; i <= questions_quantity; i++) {
        if (completed.indexOf(i) != -1) {
            arr.push(
                    <a href={`/${urlBase}/${baseID}/${i}/`}>
                        <div className='square active'>
                            {i}
                        </div>
                    </a>
                    );
        }
        else {
            arr.push(
                <a href={`/${urlBase}/${baseID}/${i}/`}>
                    <div className='square'>
                        {i}
                    </div>
                </a>
                );
        }
        
    }


    return (
        <div className='main-wrap'>
            {arr.map((item) => (
                <>{item}</>
            ))}
        </div>


    )
}

export default TestNavbar;
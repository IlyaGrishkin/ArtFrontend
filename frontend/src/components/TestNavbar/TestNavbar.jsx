import React from 'react';
import './TestNavbar.css'
import { Button } from 'react-bootstrap';
import { getAPIData } from '../../redux/reduxIndex';
import { useParams } from 'react-router-dom';




function TestNavbar(props) {
    const questions_quantity = props.questions_quantity;
    const { id } = useParams();
    const completed = props.completed;
    const { testID } = useParams();

    let arr = [];

    for (let i = 1; i <= questions_quantity; i++) {
        if (completed.indexOf(i) != -1) {
            arr.push(
                    <a href={`/card/${testID}/${i}/`}>
                        <div className='square active'>
                            {i}
                        </div>
                    </a>
                    );
        }
        else {
            arr.push(
                <a href={`/card/${testID}/${i}/`}>
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
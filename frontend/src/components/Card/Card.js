import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios'
import {URLS} from '../Utils/constants'
import './Card.css';



function AppCard(props) {
    const id = props.id
    const testID = props.testID
    const variants = props.variants;
    const questionsQuantity = props.questionsQuantity
    const [answer, setAnswer] = useState({});
    

    if (!localStorage.getItem("answers")) {
        let answersStorage = {};

        for (let i = 1; i <= questionsQuantity; i++) {
            answersStorage[i] = []
        }

        localStorage.setItem('answers', JSON.stringify(answersStorage));
    }

    const [active, setActive] = useState(JSON.parse(localStorage.getItem("answers"))[id] ? JSON.parse(localStorage.getItem("answers"))[id] : []);

    const testRunning = JSON.parse(localStorage.getItem("testRunning"));

    if (!testRunning) {
        localStorage.setItem("testRunning", JSON.stringify(testID));
    }
    else if (!(testRunning == testID)) {
        return (
            <div>
                <h1>Пошёл нахуй</h1>
            </div>
        )
    }
    else {
    
        function changeActive(pos) {

            let newActive = active.slice();
            if (newActive.indexOf(pos) != -1) {
                newActive.splice(newActive.indexOf(pos), 1);
            }
            else {
                newActive.push(pos);
            }

            return newActive;
        }

        function addAnswer(questionId, activeList) {
            let ans = JSON.parse(localStorage.getItem('answers'));
            ans[questionId] = activeList;
            localStorage.setItem('answers', JSON.stringify(ans));
        }

        function sendAnswers(){
            const answers = JSON.parse(localStorage.getItem("answers"))
            console.log(answers)
            const apiUrl = `http://localhost:8000/api/v1/tests/update/attempt`;
            let config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
                }
            }
            axios.post(apiUrl, 
                {
                    test_id: testID,
                    user_answers: answers
                },
                config
            )
            
            .then((resp) => {
            const serverData = resp.data;
            console.log(serverData);
            //localStorage.setItem("timeStart", JSON.stringify(parseInt((new Date(serverData.data.created_at).getTime() / 1000).toFixed(0))))
            localStorage.setItem("answers",  JSON.stringify(serverData.data.user_answers))
            }) 
        }

        


        return (
             
                <Card className='my-3'>
                    <div>
                        <Card.Img variant="top" src={props.picture ? "http://127.0.0.1:8000" + props.picture : "https://avatars.mds.yandex.net/i?id=dc7cbd3877e56749ab41a0fcc5145434_l-5231880-images-thumbs&n=13"} />
                        <Card.Body>
                            <Card.Title>{ }</Card.Title>
                            <Card.Text>
                                <h5>{id}. {props.question.title}</h5>
                            </Card.Text>
                        </Card.Body>

                        <ListGroup className="list-group-flush">
                            {variants.map((variant) => (
                                <ListGroup.Item>
                                    <Button className="w-100"
                                        variant={(active.indexOf(variant.id) != -1)? "primary" : "outline-primary"}
                                        onClick={() => { setActive(changeActive(variant.id)) }}>{variant.text}
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <Card.Body style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {
                                questionsQuantity == id ? 
                                <>
                                 <Button onClick={() => {addAnswer(id, active); sendAnswers()}} className="w-50" variant='outline-success' >Сохранить</Button>
                                 <Button onClick={() => {addAnswer(id, active); sendAnswers(); window.location.href = `http://localhost:3000/${testID}/results/`}} className="w-50" variant='outline-success' >Завершить тест</Button> 
                                </>
                                :
                                <Button onClick={() => {addAnswer(id, active); sendAnswers(); window.location.href = `http://localhost:3000/card/${testID}/${parseInt(id) + 1}/`}} className="w-50" variant='outline-success' >Далее</Button>
                            }
                            
                                
                                           
                        </Card.Body>
                    
                    </div>

                </Card>
            
        );


    }
}

//href={id == questionsQuantity ? `/${testID}/results/` : `/card/${testID}/${id ? parseInt(id) + 1 : 1}/`} 

export default AppCard;
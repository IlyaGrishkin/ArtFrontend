import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios'
import { API_URLS, getTestResult, nextQuestion, SERVER_HOST, URLS } from '../Utils/constants'
import './Card.css';




function AppCard(props) {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 992px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 992px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);


    const id = props.id
    const testID = props.testID
    const variants = props.variants;
    const questionsQuantity = props.questionsQuantity

    const userAnswers = props.userAnswers
    const active = props.active.slice()


    function addAnswer(questionId, pos) {
        let newActive = active.slice();

        if (newActive.indexOf(pos) != -1) {
            newActive.splice(newActive.indexOf(pos), 1);
        }
        else {
            newActive.push(pos);
        }
        let ans = Object.assign({}, userAnswers)
        console.log('before', ans)
        ans[questionId] = newActive.slice();
        console.log('ans', ans)
        props.setActive(newActive)
        props.setAnswers(ans)
    }



    function sendAnswers() {
        const answers = userAnswers
        console.log(answers)
        const apiUrl = API_URLS.UPDATE_TEST;
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
            })
            .catch((resp) => {
                console.log(resp)
                if (resp.response.status == 400) {
                    window.location.href = URLS.TEST_RESULT
                }
            }
            )
    }

    

    return (
        <Card style={{width: matches ? '100%' : '90%' }} className='my-3 home-card-wrap'>
            <div>
                <Card.Img variant="top" src={props.picture ? SERVER_HOST + props.picture : "https://avatars.mds.yandex.net/i?id=dc7cbd3877e56749ab41a0fcc5145434_l-5231880-images-thumbs&n=13"} />
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
                                variant={(active.indexOf(variant.id) != -1) ? "primary" : "outline-primary"}
                                onClick={() => { addAnswer(id, variant.id); }}>{variant.text}
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Card.Body style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {
                        questionsQuantity == id ?
                            <>
                                <Button onClick={() => { sendAnswers() }} className="w-50" variant='outline-success' >Сохранить</Button>
                                <Button onClick={() => { sendAnswers(); props.finishTest(); window.location.href = getTestResult(testID) }} className="w-50" variant='outline-success' >Завершить тест</Button>
                            </>
                            :
                            <Button onClick={() => { sendAnswers();  window.location.href = nextQuestion(testID, id)}} className="w-50" variant='outline-success' >Далее</Button>
                    }



                </Card.Body>

            </div>

        </Card>

    );


}


//

//href={id == questionsQuantity ? `/${testID}/results/` : `/card/${testID}/${id ? parseInt(id) + 1 : 1}/`} 

export default AppCard;
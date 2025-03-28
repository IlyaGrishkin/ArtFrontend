import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import TestNavbar from "../TestNavbar/TestNavbar";
import { API_URLS, SERVER_HOST } from '../Utils/constants';
import axios from 'axios';




export function ViewingCard() {
    const { id } = useParams();
    const { attemptID } = useParams();

    const [userAnswers, setUserAnswers] = useState([])
    const [variants, setVariants] = useState([])
    const [questionText, setQuestionText] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [correctAnswers, setCorrectAnswers] = useState({})
    const [questionQuantity, setQuestionQuantity] = useState(0)

    useEffect(() => {
        const apiUrl = API_URLS.GET_ATTEMPT_INFO;
        let config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
            }
        }
        axios.post(apiUrl,
            {
                attempt_id: attemptID
            },
            config
        )

            .then((resp) => {
                const serverData = resp.data;
                console.log(serverData)
                setQuestionQuantity(serverData.data.question_list.length)

                const currentQuestion = serverData.data.question_list[parseInt(id) - 1]
                setQuestionText(currentQuestion.title)
                setPictureURL(currentQuestion.picture)
                setVariants(currentQuestion.answers)

                setCorrectAnswers(serverData.data.correct_answers[id])
                setUserAnswers(serverData.data.user_answers[id])
                console.log(serverData.data.user_answers)

            })
            .catch(resp => {
                console.log(resp)
            })

    })


    function computeVariant(variantID) {
        let styles = "outline-primary disabled"
        if (userAnswers.indexOf(variantID) != -1 && correctAnswers.indexOf(variantID) != -1) {
            styles = "success disabled"
        }
        else if (userAnswers.indexOf(variantID) == -1 && correctAnswers.indexOf(variantID) != -1) {
            styles = "outline-success disabled"
        }
        else if (userAnswers.indexOf(variantID) != -1 && correctAnswers.indexOf(variantID) == -1) {
            styles = "danger disabled"
        }
        return styles

    }

    console.log(userAnswers)
    console.log(correctAnswers)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className='col'>
                    <h3>Навигация</h3>
                    <TestNavbar questions_quantity={questionQuantity} completed={[]} viewing={true} />
                </div>
                <div className="col-sm-6 col-md-5">
                    <Card className='my-3'  >

                        <div>
                            <Card.Img variant="top" src={pictureURL ? SERVER_HOST + pictureURL : "https://avatars.mds.yandex.net/i?id=dc7cbd3877e56749ab41a0fcc5145434_l-5231880-images-thumbs&n=13"} />
                            <Card.Body>
                                <Card.Title>{ }</Card.Title>
                                <Card.Text>
                                    <h5>{id}. {questionText}</h5>
                                </Card.Text>
                            </Card.Body>

                            <ListGroup className="list-group-flush">
                                {variants.map((variant) => (
                                    <ListGroup.Item>
                                        <Button className="w-100" variant={computeVariant(variant.id)}>
                                            {variant.text}
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <Card.Body style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {id == questionQuantity ?
                                    <Button onClick={() => { localStorage.removeItem("viewingData") }} className="w-50" variant='outline-success' href={`/`}>Завершить просмотр</Button>
                                    : <Button className="w-50" variant='outline-success' href={`/viewing/${attemptID}/${parseInt(id) + 1}/`}>Далее</Button>}
                            </Card.Body>
                        </div>


                    </Card>
                </div>
                <div className="col"></div>

            </div>



        </div>

    );
}
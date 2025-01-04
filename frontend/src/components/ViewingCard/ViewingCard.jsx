import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import TestNavbar from "../TestNavbar/TestNavbar";




export function ViewingCard() {
    const { id } = useParams();
    const { testID } = useParams();


    const [userAnswers, setUserAnswers] = useState([])
    const [variants, setVariants] = useState([])
    const [questionText, setQuestionText] = useState("")
    const [pictureURL, setPictureURL] = useState("")
    const [correctAnswers, setCorrectAnswers] = useState({})
    const [questionQuantity, setQuestionQuantity] = useState(0)


    useEffect(() => {
        setVariants(JSON.parse(localStorage.getItem("viewQuestions"))[id - 1].answers)
        setQuestionText(JSON.parse(localStorage.getItem("viewQuestions"))[id - 1].title)
        setQuestionQuantity(JSON.parse(localStorage.getItem("viewQuestions")).length)
        setUserAnswers(JSON.parse(localStorage.getItem("viewUserAnswers"))[id] ?
            JSON.parse(localStorage.getItem("viewUserAnswers"))[id] : [])
        setPictureURL(JSON.parse(localStorage.getItem("viewQuestions"))[id - 1].picture)
        setCorrectAnswers(JSON.parse(localStorage.getItem("viewCorrectAnswers"))[id])
    }, [])

    const questionsQuantity = JSON.parse(localStorage.getItem("viewQuestions")).length

    //window.addEventListener('unload', function() {
    // localStorage.removeItem("viewUserAnswers")
    //})


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
                            <Card.Img variant="top" src={pictureURL ? "http://127.0.0.1:8000" + pictureURL : "https://dev-education.apkpro.ru/media/news_image/e0d1d096-0f66-4cc9-a181-5cf9b2f27d9f.jpg"} />
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
                                {id == questionsQuantity ?
                                    <Button onClick={() => { localStorage.removeItem("viewingData") }} className="w-50" variant='outline-success' href={`/`}>Завершить просмотр</Button>
                                    : <Button className="w-50" variant='outline-success' href={`/viewing/${testID}/${parseInt(id) + 1}/`}>Далее</Button>}
                            </Card.Body>
                        </div>


                    </Card>
                </div>
                <div className="col"></div>

            </div>



        </div>

    );
}
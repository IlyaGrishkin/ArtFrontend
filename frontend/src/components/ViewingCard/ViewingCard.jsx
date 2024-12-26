import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';



export function ViewingCard() {
    const {id} = useParams();
    const {testID} = useParams();
    
    
    const [userAnswers, setUserAnswers] = useState([]) 
    const [variants, setVariants] = useState([])
    const [questionText, setQuestionText] = useState("")
    const [pictureURL, setPictureURL] = useState("")

    useEffect(() => {
        setVariants(JSON.parse(localStorage.getItem("viewQuestions"))[id - 1].answers)
        setQuestionText(JSON.parse(localStorage.getItem("viewQuestions"))[id - 1].title)
        setUserAnswers(JSON.parse(localStorage.getItem("viewUserAnswers"))[id] ? 
        JSON.parse(localStorage.getItem("viewUserAnswers"))[id] : [])
        setPictureURL(JSON.parse(localStorage.getItem("viewQuestions"))[id - 1].picture)
    }, [])

    const questionsQuantity = JSON.parse(localStorage.getItem("viewQuestions")).length

    //window.addEventListener('unload', function() {
       // localStorage.removeItem("viewUserAnswers")
    //})
 
    function computeCardSize() {
        let width = window.screen.width;
        let computed = 27;
        if (width < 800 && width > 500) {
            computed = 55;
        }
        else if (width <= 500) {
            computed = 80;
        }
        return computed;
    }

    return (

        <Card className='my-3' style={{ width: computeCardSize() + "%" }}>

            <div>
                <Card.Img variant="top" src={pictureURL ? "http://127.0.0.1:8000" + pictureURL : "https://dev-education.apkpro.ru/media/news_image/e0d1d096-0f66-4cc9-a181-5cf9b2f27d9f.jpg"} />
                <Card.Body>
                    <Card.Title>{}</Card.Title>
                    <Card.Text>
                        <h5>{id}. {questionText}</h5>
                    </Card.Text>
                </Card.Body>

                <ListGroup className="list-group-flush">
                        {variants.map((variant) => (
                            <ListGroup.Item>
                            <Button className="w-100" variant={userAnswers.indexOf(variant.id) != -1 ? "primary disabled" : "outline-primary disabled"}>
                                {variant.text}
                            </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                <Card.Body style={{display: 'flex', justifyContent: 'flex-end'}}>
                   {id == questionsQuantity ? 
                   <Button onClick={() => {localStorage.removeItem("viewingData")}} className="w-50" variant='outline-success' href={`/`}>Завершить просмотр</Button>
                   :<Button className="w-50" variant='outline-success' href={`/viewing/${testID}/${parseInt(id) + 1}/`}>Далее</Button>}
                </Card.Body>
            </div>


        </Card>
    );
}
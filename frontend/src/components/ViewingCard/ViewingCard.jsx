import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { getAPIData,addAnswer, results} from '../../redux/reduxIndex';
import { useParams } from 'react-router-dom';



export function ViewingCard() {
    const [{id}, setId] = useState(useParams());
    const [{testID}, setTestId] = useState(useParams());

    const data = JSON.parse(localStorage.getItem("viewingData"));
    const questionAnswers = data.answers[id];

    const test = getAPIData();
    const questionsQuantity = test.questions.length;
    const variants = test.questions[id - 1].variants;
    

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
                <Card.Img variant="top" src="https://www.mos.ru/upload/newsfeed/afisha/GL(232656)(13).jpg" />
                <Card.Body>
                    <Card.Title>{}</Card.Title>
                    <Card.Text>
                        <h5>{id}. {}</h5>
                    </Card.Text>
                </Card.Body>

                <ListGroup className="list-group-flush">
                        {variants.map((variant) => (
                            <ListGroup.Item>
                            <Button className="w-100" variant={questionAnswers.indexOf(variant.id) != -1 ? "primary disabled" : "outline-primary disabled"}>
                                {variant.text}
                            </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                <Card.Body style={{display: 'flex', justifyContent: 'flex-end'}}>
                   {id == questionsQuantity ? 
                   <Button onClick={() => {localStorage.removeItem("viewingData")}} className="w-50" variant='outline-success' href={`/viewing/finish/`}>Завершить просмотр</Button>
                   :<Button className="w-50" variant='outline-success' href={`/viewing/${testID}/${parseInt(id) + 1}/`}>Далее</Button>}
                </Card.Body>
            </div>


        </Card>
    );
}
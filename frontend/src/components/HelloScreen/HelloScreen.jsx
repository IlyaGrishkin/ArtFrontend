import './HelloScreen.css'
import churchImage from './church.jpg'
import { ScrollableList } from '../Scroller/Scroller'
import { GuideCardPreview } from '../GuideCardPreview/GuideCardPreview'
import { API_URLS, startTest, URLS } from '../Utils/constants'
import { useEffect, useState } from 'react'
import timeImage from './time-svgrepo-com (2).svg'
import quantityImg from './pen-new-square-svgrepo-com.svg'
import axios from 'axios'
import { Card } from 'react-bootstrap';
import { MyVerticallyCenteredModal } from '../Modal/Modal';
import { motion } from "motion/react"



export function HelloScreen() {

    const apiUrl = API_URLS.GET_ALL_TESTS
    const MAX_CARDS = 3

    const [testList, setShownTestList] = useState([])
    const [modalShow, setModalShow] = useState(false)

    const [title, setTitle] = useState("")
    const [readyToStart, setReadyToStart] = useState(null)
    const [onUnfound, setOnUnfound] = useState("")

    useEffect(() => {
        axios.get(apiUrl).then((resp) => {
            const serverData = resp.data;
            console.log(serverData)


            const tests = serverData.data.items
            let testList = []
            for (let test of tests) {
                testList.push(test)
                 
            }
            setShownTestList(testList.slice(0, MAX_CARDS))
        })
            .catch(resp => {
                console.log(resp)
            })
    }, [])


    const items = [
        <div className='guide-card-promo d-flex align-items-end border-end me-3' style={{height: "400px", width: "250px"}}>
                <div className='mb-5'>
                    <div className="rounded-circle mb-3" style={{width: "14px", height: "14px", backgroundColor: 'black'}}></div>
                    <div>
                        <p className="fw-bold fs-4">Гайд-карточки на<br/> любой вкус</p>
                    </div>
                    <button className='btn btn-dark rounded-pill px-4' onClick={() => window.location.href = URLS.GUIDE_CARDS
                            }>Начать изучать</button>
                </div>
                
         </div>,
        <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={"https://avatars.mds.yandex.net/i?id=5b7efea1c6f9faed9bff0b588c4e1c76_l-4304327-images-thumbs&n=13"}
        title={"Иконы"} text={"Погрузитесь в мир русской иконописи раовдо одывмолдр ловмыро ролрол рлр ррлл влоол ол"}/>,
        <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Leighton%2C_Frederic_-_Idyll_-_c._1880-81.jpg/600px-Leighton%2C_Frederic_-_Idyll_-_c._1880-81.jpg"}
        title={"Иконы"} text={"Погрузитесь в мир русской иконописи"}/>,
        <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={"https://i09.fotocdn.net/s208/0f5e59af40cafe89/public_pin_l/2514485282.jpg"}
        title={"Иконы"} text={"Погрузитесь в мир русской иконописи"}/>,
        <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={"https://avatars.mds.yandex.net/i?id=5b7efea1c6f9faed9bff0b588c4e1c76_l-4304327-images-thumbs&n=13"}
        title={"Иконы"} text={"Погрузитесь в мир русской иконописи"}/>,
        <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={"https://avatars.mds.yandex.net/i?id=5b7efea1c6f9faed9bff0b588c4e1c76_l-4304327-images-thumbs&n=13"}
        title={"Иконы"} text={"Погрузитесь в мир русской иконописи"}/>,
        <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={"https://avatars.mds.yandex.net/i?id=5b7efea1c6f9faed9bff0b588c4e1c76_l-4304327-images-thumbs&n=13"}
        title={"Иконы"} text={"Погрузитесь в мир русской иконописи"}/>,
         
    ]

    function handleTestStart(testID) {
            if (JSON.parse(localStorage.getItem("accessToken"))) {
                console.log(testID)
                const apiUrl = API_URLS.CREATE_TEST;
                let config = {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Auth-Token": JSON.parse(localStorage.getItem("accessToken"))
                    }
                }
                axios.post(apiUrl,
                    {
                        test_id: testID
                    },
                    config
                )
    
                    .then((resp) => {
                        const serverData = resp.data;
                        console.log('create', serverData)
                        localStorage.setItem("testTime", Math.floor(new Date(serverData.data.created_at).getTime() / 1000))
                        localStorage.setItem("answers", JSON.stringify(serverData.data.user_answers))
                        let test;
                        for (let item of testList) {
                            if (item.id == testID) {
                                test = item;
                            }
                        }
                        localStorage.setItem("testDuration", JSON.stringify(test.work_time * 60))
                        localStorage.setItem("testRunning", JSON.stringify(testID))
                        window.location.href = startTest(testID)
    
                    })
                    .catch(resp => {
                        if (resp.response.status == 400) {
                            alert('Вы уже проходите другой тест. Завершите его, чтобы начать этот.')
                        }
                    })
    
            }
    
    
            else {
                alert("Для прохождения теста необходимо авторизоваться")
            }
        }
    

    const normalStyle = "col-lg-6 col-xl-4 d-flex justify-content-center my-3"


    return (
         <div className="container mt-5">
            <div className='d-flex gap-3 align-items-center justify-content-end pe-4'>
                <div className="rounded-circle mb-5" style={{width: "14px", height: "14px", backgroundColor: 'black'}}></div>
                <p className='fw-bold fs-5 text-end'>
                Русское искусство - мир <br/>шедевров и секретов</p>
            </div>
            <div className='pb-5 border-bottom mb-5'>
                <h1 className='text-center'>Приглашаем вас исследовать  <span className='font-spectral'>РУССКОЕ<br/> ИСКУССТВО</span> вместе с нами</h1>
            </div>
            
            <img className='w-100' src={churchImage} alt="" />

            <h2 className='text-center my-5'> <span className=''>ПОЛУЧАЙТЕ ЗНАНИЯ</span> <br/> и <span className='font-spectral'>ОТКРЫВАЙТЕ НОВОЕ</span> <br/> с нашими карточками</h2>

            <div className="scrollable-wrap border-bottom border-top">
                <ScrollableList items={items}/>
            </div>

            <h2 className='text-center my-5'>Проверяйте свои знания</h2>

            <div className='container'>
                <div className="row">
                    <div className="col-12 col-md-6">
                    {testList.length > 0 ? testList.map((test, index) =>
                                    <motion.div className={normalStyle}
                                        initial={
                                            {
                                                y: 100,
                                                opacity: 0
                                            }
                                        }
                                        animate={
                                            {
                                                y: 0,
                                                opacity: 1,
                                                transition: { duration: 0.5 }
                                            }}
                                        whileHover={{
                                            y: -3,
                                            transition: { duration: 0.1 }
                                        }}
                                    >
                                        <Card className="card mb-4 home-card-wrap p-0" style={{ cursor: "pointer", maxWidth: '24rem', margin: 0, height: 480 + 'px' }} onClick={() => { setTitle(test.title); setModalShow(true); setReadyToStart(test.id) }}>
                                            <Card.Img variant="top" src={test.picture ? "http://127.0.0.1:8000" + test.picture : "https://dev-education.apkpro.ru/media/news_image/e0d1d096-0f66-4cc9-a181-5cf9b2f27d9f.jpg"} />
                                            <Card.Body>
                                                <Card.Title className='card-title'>{test.title}</Card.Title>
                                                <Card.Text>
                                                    {test.description}
                                                </Card.Text>
                                                <Card.Text>
                                                    <div className='timeInfo d-flex'>
                                                        <p>Время: {test.work_time} мин</p>
                                                        <img src={timeImage} width={20 + 'px'} className='pb-3 mx-2'/>
                                                    </div>

                                                    <div className='questionsInfo d-flex'>
                                                        <p>Количество вопросов: {test.question_count}</p>
                                                        <img src={quantityImg} width={20 + 'px'} className='pb-3 mx-2'/>
                                                    </div>


                                                </Card.Text>
                                            </Card.Body>

                                        </Card>


                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            testName={title}
                                            onTestStart={() => handleTestStart(readyToStart)}
                                        />
                                    </motion.div>

                                ) : <h4>{onUnfound}</h4>}
                    </div>
                </div>
            </div>
            
         </div>
    )
}
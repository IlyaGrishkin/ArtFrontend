import './HelloScreen.css'
import churchImage from './church.jpg'
import { ScrollableList } from '../Scroller/Scroller'
import { GuideCardPreview } from '../GuideCardPreview/GuideCardPreview'
import { URLS } from '../Utils/constants'


export function HelloScreen() {
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
            
         </div>
    )
}
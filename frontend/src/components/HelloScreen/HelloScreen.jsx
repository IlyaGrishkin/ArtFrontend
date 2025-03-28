import { imageListClasses } from '@mui/material'
import './HelloScreen.css'
import { ScrollableList } from '../Scroller/Scroller'
import { GuideCardPreview } from '../GuideCardPreview/GuideCardPreview'


export function HelloScreen() {
    const items = [
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
         <div className="container">
            <div className="scrollable-wrap">
                <h4 className='mb-4 fw-bold'>Гайд-карточки</h4>
                <ScrollableList items={items}/>
            </div>
         </div>
    )
}
import { imageListClasses } from '@mui/material'
import './HelloScreen.css'
import { ScrollableList } from '../Scroller/Scroller'
import { GuideCardPreview } from '../GuideCardPreview/GuideCardPreview'


export function HelloScreen() {
    const items = [
        <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={"https://avatars.mds.yandex.net/i?id=5b7efea1c6f9faed9bff0b588c4e1c76_l-4304327-images-thumbs&n=13"}
        title={"Иконы"} text={"Погрузитесь в мир русской иконописи"}/>,
        <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={"https://avatars.mds.yandex.net/i?id=5b7efea1c6f9faed9bff0b588c4e1c76_l-4304327-images-thumbs&n=13"}
        title={"Иконы"} text={"Погрузитесь в мир русской иконописи"}/>,
        <GuideCardPreview borderRadius={"12px"} height={200} width={320} image={"https://avatars.mds.yandex.net/i?id=5b7efea1c6f9faed9bff0b588c4e1c76_l-4304327-images-thumbs&n=13"}
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
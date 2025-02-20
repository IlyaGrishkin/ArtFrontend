import { getGuideCard } from "../Utils/constants"
import "./GuideCardPreview.css"


export function GuideCardPreview(props) {
    return (
        <div className="p-0 m-0 guide-card-preview" onClick={() => window.location.href = getGuideCard(props.id)
}>
 
            <img width={100 + "%"} src={props.image} alt="" />
   
            <div className="m-0 guide-card-preview-body px-3 py-3">
                <h4>{props.title}</h4>
                <p style={{color: "grey"}}>{props.text}</p>
            </div>
        </div>
    )
}

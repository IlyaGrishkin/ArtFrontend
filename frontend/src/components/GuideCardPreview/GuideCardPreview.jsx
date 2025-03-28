import { getGuideCard } from "../Utils/constants"
import "./GuideCardPreview.css"


export function GuideCardPreview(props) {
    return (
        <div className="p-0 m-0 guide-card-preview" onClick={() => window.location.href = getGuideCard(props.id)
}>
 
            <img width={"300px"} height={"180px"} src={props.image} alt="" />
   
            <div className="m-0 guide-card-preview-body px-3 py-3">
                <h4>{props.title}</h4>
                <p className="guide-card-text" style={{color: "grey"}}>{props.text}</p>
            </div>
        </div>
    )
}

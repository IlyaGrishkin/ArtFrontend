import { getGuideCard } from "../Utils/constants"
import "./GuideCardPreview.css"


export function GuideCardPreview(props) {
    let text = props.text
    return (
        <div className="p-0 m-0 guide-card-preview">
 
            <img width={"300px"} height={"180px"} src={props.image} alt="" className="guide-card-img" />
   
            <div className="m-0 guide-card-preview-body px-3 py-3" style={{overflow: 'hidden'}}>
                <h4>{props.title}</h4>
                <p className="guide-card-text" style={{color: "grey", overflow: 'hidden'}}>{text}</p>
            </div>
            <div className="m-0 px-3 py-3 pt-0">
                <button className="btn btn-dark mt-2 w-100 p-2" onClick={() => window.location.href = getGuideCard(props.id)
        }>Читать</button>
            </div>
            
        </div>
    )
}

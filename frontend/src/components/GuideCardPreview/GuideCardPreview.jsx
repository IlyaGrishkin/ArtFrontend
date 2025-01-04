import "./GuideCardPreview.css"


export function GuideCardPreview(props) {
    return (
        <div className="p-0 m-0">
 
            <img style={{borderRadius: props.borderRadius}} height={props.height} width={props.width} src={props.image} alt="" />
   
            <div className="mt-3">
                <h4>{props.title}</h4>
                <p style={{color: "grey"}}>{props.text}</p>
            </div>
        </div>
    )
}

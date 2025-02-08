import { useEffect, useState } from "react";
import "./AnimatedLink.css"



export function AnimatedLink(props) {
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 992px)").matches
      )
    
      useEffect(() => {
        window
        .matchMedia("(min-width: 992px)")
        .addEventListener('change', e => setMatches( e.matches ));
      }, []);
    return (
       
            <a href={props.href} className={`${props.styles} nav-link ${matches ? 'dashed-link' : ''}`} style={
                {
                    color: props.color ? props.color : 'inherit'
                }
            }> {props.text} </a>
  
    )
}
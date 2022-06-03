export default function Die(props){
    return(
        <div className={props.isHeld?`box selected ${props.Value}`:`box ${props.Value}`} onClick={props.handleClick}
              >
            {props.Value==="one"&&<span className="dot"></span>} 
            {props.Value==="two"&&<span className="dot"></span>}
            {props.Value==="two"&&<span className="dot"></span>}
            {props.Value==="three"&&<span className="dot"></span>}
            {props.Value==="three"&&<span className="dot"></span>}
            {props.Value==="three"&&<span className="dot"></span>}
            {props.Value==="four"&&<div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            </div>}
            {props.Value==="four"&&<div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            </div>}
            {props.Value==="five"&&<div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            </div>}
            {props.Value==="five"&&<div className="column">
            <span className="dot"></span>
            </div>}
            {props.Value==="five"&&<div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            </div>}
            {props.Value==="six"&&<div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            </div>}
            {props.Value==="six"&&<div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            </div>}

        </div>
    )
}
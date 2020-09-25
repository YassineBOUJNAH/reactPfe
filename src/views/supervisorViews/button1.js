import React from 'react' 
import './button.scss' ; 

function Button1(props) {
    return (
     <div className="btn1">
       <button onClick={props.onclick} >{props.name}</button> 

      </div> 
      
    )
}

export default Button1 ;

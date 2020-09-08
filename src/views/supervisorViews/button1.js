import React from 'react' 
import './button.scss' ; 

function Button1(props) {
    return (
       <div className="container_but">
       <a onClick={props.onclick} class="button">{props.name}</a>
      </div>  
    )
}

export default Button1 ;

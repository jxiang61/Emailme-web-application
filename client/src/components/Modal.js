import React from "react";
import ReactDOM from "react-dom";


const Modal = (props) => {

    return ReactDOM.createPortal(
        //two arguments
        //click the div, then go back to root page
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            {/*click this div, stop to execute the history.push() function above; stop bobble up*/}
            <div
                style={{marginLeft:'auto', marginRight:'auto'}}
                onClick={(e) => e.stopPropagation()}
                className="ui standard modal visible active"
            >
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.action}</div>
            </div>
        </div>,

        document.querySelector("#modal")

    )
}

export default Modal;

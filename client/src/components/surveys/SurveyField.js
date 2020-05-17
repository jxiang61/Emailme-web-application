//SurveyField contains logic to render a single label and text input
import React from "react";

//export a type of Field component
//props comes from input, and some event handlers in it
//redux-form automatically provides these event handlers, like onChange, onDrop, etc.
export default (props) => {
    return (
        <div>
            <label>{props.label}</label>
            {/*{...props.input} means we pass these event handlers here, onChange(), etc...*/}
            {/*so redux-form can watch the input in real time, without this, it cannot do it*/}
            <input {...props.input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom:'20px'}}>
                {props.meta.touched && props.meta.error ? props.meta.error : null}
            </div>

        </div>
    )
}

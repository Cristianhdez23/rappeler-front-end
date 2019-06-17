import React from 'react'

import './Backdrop.scss';

const backdrop = (props) => (
    props.show ? <div className={[props.modal ? "backdrop-modal" : "backdrop"]} onClick={props.clicked}></div> : null
);
 
export default backdrop;
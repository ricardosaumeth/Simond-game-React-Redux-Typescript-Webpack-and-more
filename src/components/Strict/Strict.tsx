import * as React from "react";

interface IStricPros {onclick:any}

const Strict = (props:IStricPros) => {
    const {onclick} = props;
    return(
        <div className="btn-box inline" onClick={()=>onclick()}>
            <div className="round-btn but clickable" id="mode"></div>
            <h3 className="label">STRICT</h3>
            <div className="led" id="mode-led"></div>
        </div>
    );
}

export default Strict;
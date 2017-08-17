import * as React from "react";

interface IPanelProps { 
    className:string, id:string,
    onclick:any
}

const Panel = (props: IPanelProps) => {
    const {className,id, onclick} = props;
    return(
            <div className={className} id={id}
                onMouseDown={()=>onclick()}
            ></div>
    );
}

export default Panel;
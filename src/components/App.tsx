import * as React from "react";
import {connect} from "react-redux"
import {bindActionCreators} from "redux";
import Panel from "./common/Panel";
import Counter from "./Counter/Counter";
import Start from "./Start/Start";
import Strict from "./Strict/Strict";
import Power from "./Power/Power";
import {panelClicked, stopPropagation, stricMode} from "../actions/gameActions";

class App extends React.Component<any, any>{    

    public render(){
        const {panelClicked, stopPropagation, stricMode} = this.props;
        return(  
            <div className="wrap" onMouseUp={()=>stopPropagation()}>

                <div className="wrap-in">
                   <div className="rw">
                       <Panel className="t-l inline push green unclickable" id="3"
                            onclick={()=>panelClicked("3")}/>
                       <Panel className="t-r inline push red but unclickable" id="2"
                            onclick={()=>panelClicked("2")}/>  
                    </div>
                    <div className="rw">
                        <Panel className="b-l inline push yellow unclickable" id="1"
                            onclick={()=>panelClicked("1")}/>
                        <Panel className="b-r inline push blue but unclickable" id="0"
                            onclick={()=>panelClicked("0")}/>
                    </div>   
                </div>

                <div className="center">
                    <h1 className="brand">Simon<span className="small">®</span></h1>
                    <div className="rw">
                        <Counter />
                        <Start />
                        <Strict onclick={()=>stricMode()}/>
                     </div>   

                     <Power />  
                </div>

	        </div>   
        );
    }
}

function mapDispatchToProps(dispath: any) {
    return bindActionCreators({
        panelClicked,
        stopPropagation,
        stricMode
        }, dispath);    
}

export default connect(null, mapDispatchToProps)(App);
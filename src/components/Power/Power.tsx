import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {gameOnOff} from "../../actions/gameActions";

interface IPowerProps {gameOnOff:any }
interface IPowerState {className:string }

class Power extends React.Component<IPowerProps, IPowerState>{

    constructor(props:IPowerProps){
        super(props);
        this.state = {
            className: "switch"
        };
        this.IsGameOn = this.IsGameOn.bind(this);
    }

    public IsGameOn(){
        //easy way to manipulate the DOM. No need of React-Redux
        let counterDiv = document.getElementsByClassName('count')[0];

        if(this.state.className === "switch"){
            this.setState(
                {
                    className: "switch sw-on"
                }
            );
           //use this to avised redux whether the game in on ot off 
           this.props.gameOnOff(true);

           counterDiv.classList.remove("led-off");
        } else {
            this.setState({className: "switch"});
            this.props.gameOnOff(false);

            counterDiv.classList.add("led-off");
        }
 
    }

    public render(){
        const {className} = this.state;
        return(
            <div className="rw bot">
                <h3 className="label inline">OFF</h3>
                <div className="sw-slot inline" onClick={this.IsGameOn}>
                    <div className={className} id="pwr-sw"></div>
                </div>
                <h3 className="label inline">ON</h3>
            </div>
        );
    }
    
}

function mapDispatchToProps(dispath: any) {
    return bindActionCreators({
        gameOnOff
        }, dispath);    
}

export default connect(null, mapDispatchToProps)(Power);
import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {startGame} from "../../actions/gameActions"

interface IStartProps {startGame:any, gameStatus: {game: {isGameOn:boolean}}}

class Start extends React.Component<IStartProps, any>{

    constructor(props:IStartProps){
        super(props);
        this.startGame = this.startGame.bind(this);
    }

    public startGame(){
        const {startGame} = this.props;
        const isGameOn = this.props.gameStatus.game.isGameOn;
        if(isGameOn){
            startGame();
        }
    }

    public render(){
        
        return(
             <div className="btn-box inline">
                <div className="round-btn full-red but clickable" id="start" 
                onClick={this.startGame}></div>
                <h3 className="label">START</h3>
            </div>
        );
    }
    
}

function mapStateToProps(state:any, ownProps:any){
    return {
        gameStatus: state.gameStatus
    };
}

function mapDispatchToProps(dispath: any) {
    return bindActionCreators({
        startGame
        }, dispath);    
}

export default connect(mapStateToProps, mapDispatchToProps)(Start);
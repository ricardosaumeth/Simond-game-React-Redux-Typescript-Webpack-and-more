import * as React from "react";

const Counter  = () =>{
        /**
         * this is now controlusing direct access to the DOM
         * const {isGameOn} = this.props.gameStatus.game;
         * <h1 className={isGameOn ? "count" : "count led-off"}>--</h1>
         */

        return(
           <div className="display inline">
				<h1 className="count led-off">--</h1>
				<h3 className="label">COUNT</h3>
			</div> 
        );   
    }

export default Counter;
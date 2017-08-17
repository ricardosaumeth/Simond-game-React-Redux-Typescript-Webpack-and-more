import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState, action:any){
    switch (action.type) {
        case  types.START_ON_OFF:
            return(
                state = {
                   ...state,
                   game: action.payload,
                   gameVariables: [...state.gameVariables, action.payload] 
                }
            );

        case  types.GAME_STARTED:
            return(
                state = {
                   ...state,
                   game: action.payload,
                   gameVariables: [...state.gameVariables, action.payload] 
                }
            ); 

        case  types.PANEL_CLICKED:
            return(
                state = {
                   ...state,
                   game: action.payload,
                   gameVariables: [...state.gameVariables, action.payload] 
                }
            );           
                        
        default:
            return state;
    }
}
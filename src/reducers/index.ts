import {combineReducers} from "redux";
import gameStatus from "./reducer-gameStatus";

const rootReducer = combineReducers({
    gameStatus
});

export default rootReducer;
import * as types from "./actionsTypes";
import GameStatus from "../Model/GameStatus";

let gameStatus = new GameStatus();

export function gameOnOff(isGameOn:boolean){
    gameStatus.isGameOn = isGameOn;
    if(!isGameOn)
        gameStatus.stopGame(); 
           
    return {
        type: types.START_ON_OFF,
        payload: {isGameOn: isGameOn}
        //payload: gameStatus
    };
}

export function startGame(){
    gameStatus.startGame();
    return {
        type: types.GAME_STARTED,
        payload: gameStatus
    };
}

export function panelClicked(id:string){
    gameStatus.pushColor(id);
    return {
        type: types.PANEL_CLICKED,
        payload: gameStatus
    };
}

export function stopPropagation(){
    gameStatus.stopPropagation();
    return {
        type: types.PANEL_CLICKED,
        payload: gameStatus
    };
}

export function stricMode(){
    if(gameStatus.isGameOn){
        gameStatus.toggleStrict();
    }
    return {
        type: types.STRICT_MODE,
        payload: gameStatus
    };
}
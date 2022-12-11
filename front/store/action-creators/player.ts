import {PlayerAction, PlayerActionType} from "../../types/player";
import {ITrack} from "../../types/track";


export const playTrack = (): PlayerAction => {
    return {type: PlayerActionType.PLAY}
}

export const pauseTrack = (): PlayerAction => {
    return {type: PlayerActionType.PAUSE}
}

export const setDuration = (payload: number ): PlayerAction => {
    return {type: PlayerActionType.SET_DURATION, payload}
}

export const setVolume = (payload: number): PlayerAction => {
    return {type: PlayerActionType.SET_VOLUME, payload}
}

export const setCurrentTime = (payload): PlayerAction => {
    return {type: PlayerActionType.SET_CURRENT_TIME, payload}
}

export const setActiveTrack = (payload: ITrack): PlayerAction => {
    return {type: PlayerActionType.SET_ACTIVE, payload}
}

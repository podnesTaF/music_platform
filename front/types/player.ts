import { ITrack } from "./track";

export interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}

export enum PlayerActionType {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
}

interface PlayAction {
    type: PlayerActionType.PLAY;
}

interface PauseAction {
    type: PlayerActionType.PAUSE;
}

interface SetActiveAction {
    type: PlayerActionType.SET_ACTIVE;
    payload: ITrack;
}

interface SetDurationAction {
    type: PlayerActionType.SET_DURATION;
    payload: number;
}

interface SetCurrentTimeAction {
    type: PlayerActionType.SET_CURRENT_TIME;
    payload: number;
}
interface SetVolumeAction {
    type: PlayerActionType.SET_VOLUME;
    payload: number;
}

export type PlayerAction =
    PlayAction |
    PauseAction |
    SetActiveAction |
    SetDurationAction |
    SetVolumeAction |
    SetCurrentTimeAction;


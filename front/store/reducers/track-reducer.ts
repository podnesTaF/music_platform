import {TrackActions, TrackActionType, TrackState} from "../../types/track";

const initialState: TrackState = {
    tracks: [],
    error: '',
}

export const trackReducer = (state = initialState, action: TrackActions): TrackState => {
    switch (action.type) {
        case TrackActionType.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        case TrackActionType.FETCH_TRACKS:
            return { error: '', tracks: action.payload}
        case TrackActionType.FETCH_DELETE_TRACK:
            const newState = state.tracks.filter(track => track._id !== action.payload)
            return {error: '', tracks: newState}
        default:
            return state
    }
}
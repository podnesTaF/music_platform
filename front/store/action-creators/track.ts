import {Dispatch} from "react";
import {TrackActions, TrackActionType} from "../../types/track";
import axios from "axios";
export const fetchTracks = (offset?) => {
    return async (dispatch: Dispatch<TrackActions>) => {
        try {
            const response = await axios.get('http://localhost:5000/tracks?count=3' + '&offset=' + (offset || 0))
            dispatch({type: TrackActionType.FETCH_TRACKS, payload: response.data})
        } catch (err) {
            dispatch({
                type: TrackActionType.FETCH_TRACKS_ERROR,
                payload: 'Error while fetching tracks'
            })
        }
    }
}

export const searchTracks = (query) => {
    return async (dispatch: Dispatch<TrackActions>) => {
        try {
            const response = await axios.get(`http://localhost:5000/tracks/search?query=${query}`)
            dispatch({type: TrackActionType.FETCH_TRACKS, payload: response.data})
        } catch (err) {
            dispatch({
                type: TrackActionType.FETCH_TRACKS_ERROR,
                payload: 'Error while fetching tracks'
            })
        }
    }
}


export interface IComment {
    _id: string;
    text: string;
    username: string;
    trackId: string;
}

export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    listens: number;
    text: string;
    picture: string;
    audio: string;
    comments: IComment[]
    album: string;
}

export interface TrackState {
    tracks: ITrack[];
    error: string;
}

export enum TrackActionType {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    FETCH_DELETE_TRACK = 'FETCH_DELETE_TRACK',

}

interface FetchTracksAction {
    type: TrackActionType.FETCH_TRACKS;
    payload: ITrack[];
}

interface FetchTrackErrorAction {
    type: TrackActionType.FETCH_TRACKS_ERROR,
    payload: string
}

interface FetchDeleteTrackAction {
    type: TrackActionType.FETCH_DELETE_TRACK;
    payload: string;
}


export type TrackActions = FetchTracksAction | FetchTrackErrorAction | FetchDeleteTrackAction ;
import {ITrack} from "./track";

export interface IAlbum {
    _id: string;
    name: string;
    description: string;
    author: string;
    picture: string;
    tracks: ITrack[];
}

export interface AlbumState {
    albums: IAlbum[];
    error: string;
}

export enum AlbumActionType {
    FETCH_ALBUMS = 'FETCH_ALBUMS',
    FETCH_ALBUM_ERROR = 'FETCH_ALBUM_ERROR',
    ADD_TRACK = 'ADD_TRACK',
    REMOVE_TRACK = 'REMOVE_TRACK',
}

interface FetchAlbumAction {
    type: AlbumActionType.FETCH_ALBUMS;
    payload: IAlbum[];
}

interface FetchAlbumErrorAction {
    type: AlbumActionType.FETCH_ALBUM_ERROR;
    payload: string
}

interface AddTrackAction {
    type: AlbumActionType.ADD_TRACK;
    payload: {
        albumId: string;
        track: ITrack;
    };
}

interface RemoveTrackAction {
    type: AlbumActionType.REMOVE_TRACK;
    payload: {
        trackId: string;
        albumId: string;
    }
}

export type AlbumActions =
    FetchAlbumAction
    | FetchAlbumErrorAction
    | AddTrackAction
    | RemoveTrackAction;


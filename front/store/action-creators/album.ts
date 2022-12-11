import {AlbumActions, AlbumActionType} from "../../types/album";
import axios from "axios";
import {Dispatch} from "react";

export const fetchAlbums = () => {
    return async (dispatch: Dispatch<AlbumActions>) => {
        try {
            const res = await axios.get('http://localhost:5000/albums')
            dispatch({type: AlbumActionType.FETCH_ALBUMS, payload: res.data})
        } catch (err) {
            dispatch({type: AlbumActionType.FETCH_ALBUM_ERROR, payload: 'Failed fetching albums'})
        }
    }
}
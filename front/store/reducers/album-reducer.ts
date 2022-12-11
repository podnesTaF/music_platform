import {AlbumActions, AlbumActionType, AlbumState} from "../../types/album";

const initialState: AlbumState = {
    albums: [],
    error: ''
}

export const albumReducer = (state = initialState, action: AlbumActions): AlbumState => {

    switch (action.type) {
        case AlbumActionType.FETCH_ALBUMS:
            return {
                albums: action.payload,
                error: ''
            }
        case AlbumActionType.FETCH_ALBUM_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }

}
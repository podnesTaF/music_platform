import {combineReducers} from "redux";
import {playerReducer} from "./player-reducer";
import {HYDRATE} from "next-redux-wrapper";
import {trackReducer} from "./track-reducer";
import { albumReducer } from "./album-reducer";


const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
    album: albumReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export type RootState = ReturnType<typeof rootReducer>
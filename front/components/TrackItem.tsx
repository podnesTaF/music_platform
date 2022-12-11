import React, {useEffect, useState} from 'react';
import {ITrack, TrackActionType} from "../types/track";
import styles from '../styles/TrackItem.module.css'
import IconButton from "@mui/material/IconButton";
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "../store";
import axios from "axios";
// import {timeTransform} from "../utils/track";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useTypedSelector} from "../hooks/useTypedSelector";

interface TrackItem {
    track: ITrack;
    active?: boolean;
    isAlbumSearch?: boolean;

    type?: 'forAlbum';
    onAddTrack?: Function;
    onRemoveTrack?: Function;
}

let duration: number;
const TrackItem: React.FC<TrackItem> = ({track, isAlbumSearch, onAddTrack, type, onRemoveTrack}) => {
    const router = useRouter()
    const {pause, active} = useTypedSelector(state => state.player)
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const dispatch = useDispatch() as NextThunkDispatch;
    const AddTrackHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onAddTrack(track)
    }
    const play = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if(!active || active._id !== track._id) {
            setActiveTrack(track)
            playTrack()
        } else if (!pause) {
            pauseTrack()
        } else {
            playTrack()
        }
    }

    const deleteTrackHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const {id} = router.query
        try {
            if(!type) {
                await axios.delete('http://localhost:5000/tracks/' + track._id)
                dispatch({type: TrackActionType.FETCH_DELETE_TRACK, payload: track._id})
            } else {
                await axios.post(`http://localhost:5000/albums/remove-track/${id}`, {trackId: track._id})
               onRemoveTrack(track)
            }
        } catch (err) {
            console.log('error deleting track', err.message)
        }
    }

    return (
        <div className='m-4 p-2 flex align-center flex-row bg-neutral-800 rounded hover:bg-neutral-700' onClick={() => router.push('/tracks/' + track._id)} >
            <IconButton onClick={play} >
                {active && active._id === track._id && !pause
                    ? <Pause />
                    : <PlayArrow />
                }
            </IconButton>
            <img className='w-20 h-20 object-cover ' src={`http://localhost:5000/${track.picture}`}/>
            <div className='my-auto ml-4'>
                <div>
                    {track.name}
                </div>
                <div style={{fontSize: 12, color: 'gray'}}>
                    {track.artist}
                </div>
            </div>
            <div className='flex flex-row ml-auto align-center'>
                        <p className='text-gray-300 mx-4 self-center'>3:22</p>
                {!isAlbumSearch && <IconButton onClick={deleteTrackHandler} className=''>
                    <Delete/>
                </IconButton>
                }
                {isAlbumSearch && <button className='btn'
                                          onClick={AddTrackHandler}>Add to album</button>}
            </div>
        </div>
    );
};

export default TrackItem;

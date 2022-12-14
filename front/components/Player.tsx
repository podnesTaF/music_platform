import React, {useEffect} from 'react';
import axios from "axios";

import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";


import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

import styles from '../styles/Player.module.css'

let audio;
const Player = () => {
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()

    // useEffect(() => {
    //     audio = new Audio()
    //     if(audio && !pause) {
    //         setAudio()
    //         // play()
    //     }
    // }, [])

    useEffect(() => {
        if(active) {
            (async() => {
                await axios.post(`http://localhost:5000/tracks/listen/${active?._id}`)
            })()
        }
        if(!audio) {
            audio = new Audio()
        } else if(audio && !pause) {
            setAudio()
            play()
        } else {
            setAudio()
        }
    }, [active])

    useEffect(() => {
        console.log('third')
        if(!pause) {
            audio.play()
        } else {
            audio.pause()
        }
    }, [pause])

    const setAudio = () => {
        if(active) {
            audio.src = 'http://localhost:5000/' + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }
    const play = () => {
        if(pause) {
            playTrack()
        } else {
            pauseTrack()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    if(!active) {
        return null
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {!pause
                    ? <Pause />
                    : <PlayArrow />
                }
            </IconButton>
            <div style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize:12, color: 'gray'}}>{active?.artist}</div>
            </div>
            <TrackProgress  left={currentTime} right={duration} onChange={changeCurrentTime} />
            <VolumeUp style={{marginLeft: 'auto'}} />
            <TrackProgress type='volume' left={volume} right={100} onChange={changeVolume} />
        </div>
    );
};

export default Player;

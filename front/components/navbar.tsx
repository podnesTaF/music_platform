import * as React from 'react';
import Link from "next/link";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UploadIcon from '@mui/icons-material/Upload';
import HomeIcon from '@mui/icons-material/Home';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AlbumIcon from '@mui/icons-material/Album';
import {NextThunkDispatch, wrapper} from "../store";
import {fetchTracks} from "../store/action-creators/track";
import { useTypedSelector } from '../hooks/useTypedSelector';
import {useState} from "react";
export default function Navbar() {
    const {tracks, error} = useTypedSelector(state => state.track)

    const sorted = tracks.sort((a, b) => a.listens - b.listens)
    return (
       <section className='m-0 p-3 flex flex-col bg-black w-60 h-screen fixed'>
            <nav className='my-4 flex flex-col align-center'>
                <Link className='link' href='/'>
                    <HomeIcon className='mr-3' fontSize='large'/> Main
                </Link>
                <Link className='link' href='/tracks'>
                    <AudiotrackIcon className='mr-3' fontSize='large'/> Tracks
                </Link >
                <Link className='link' href='/albums'>
                    <AlbumIcon className='mr-3'  fontSize='large'/> Albums
                </Link>
            </nav>
           <nav className='my-4 flex flex-col'>
               <Link className='link flex mb-2 align-center' href='/albums/create'>
                   <AddCircleOutlineIcon fontSize='large' />
                   <p className='ml-2'>Create Album</p>
               </Link>
               <Link className='link flex mb-2 align-center' href='/tracks/create'>
                   <UploadIcon fontSize='large'/>
                   <p className='ml-2'>Upload Track</p>
               </Link>
           </nav>
           <hr/>
           <div className='flex flex-col'>
               <h1 className='text-xl text-center'>Top tracks</h1>
               <div className='ml-2'>
                   {sorted.map(track => (
                       <div className='my-3 p-2 rounded bg-gray-700/50 flex flex-row'>
                           <img src={`http://localhost:5000/${track.picture}`} alt="track picture" className='rounded-full w-10 h-10 self-center mr-3' />
                           <div>
                               <p className='text-xl'>{track.name}</p>
                               <p className='text-gray-400'>{track.artist}</p>
                               <p>listened: {track.listens}</p>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       </section>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => {
    return async () => {
        // @ts-ignore
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchTracks(0))
        return {props: {}}
    };
})
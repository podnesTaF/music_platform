import React, {useState} from 'react';
import { ITrack } from '../types/track';
import {Grid, Box} from "@mui/material";
import TrackItem from "./TrackItem";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
interface TrackListProps {
    onRemoveTrack?: Function;
    tracks: ITrack[];
    type?: 'forAlbum'
}
const TrackList: React.FC<TrackListProps> =
    ({tracks, type, onRemoveTrack}) => {
    if(tracks.length === 0) {
        return <div className='h-screen ml-4'>
                <h1 className='text-2xl m-4'>{type ? 'There is no tracks in the album yet, Maybe add one?' : 'There is no track, you can add one'}</h1>
        </div>
    }
    return (
        <section className='h-full flex flex-col m-10'>
            <div className='w-full'>
                <div className='flex flex-row justify-between pb-2 border-b-2 border-gray-300/50'>
                    <h2 className='text-xl ml-16 text-gray-300/50'>Name</h2>
                    <h2 className='text-xl text-gray-300/50 mr-20'><AccessTimeIcon className='self-center mb-1' /></h2>
                </div>
                {tracks.map((track) => (
                    <TrackItem
                        onRemoveTrack={onRemoveTrack}
                        key={track._id}
                        track={track}
                        type={type ? 'forAlbum' : null}
                    />
                ))}
            </div>
        </section>
    );
};

export default TrackList;

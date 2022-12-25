import React, {useState} from 'react';
import {ITrack} from "../types/track";
import {useSearch} from "../hooks/useSearch";
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add'
import {TextField} from "@mui/material";

interface AlbumSelectProps {
    setTracks: Function;
    tracks: ITrack[];
}

const AlbumSelect: React.FC<AlbumSelectProps> = ({setTracks, tracks}) => {
    const [selected, setSelected] = useState([]);
    const search = useSearch()

    const handleTrack = (id) => {

        if(!selected.includes(id)) {
            setSelected(prev => [...prev, id])
            setTracks(prev => [...prev, id])
        } else {
            setSelected(prev => prev.filter(track => track !== id))
            setTracks(prev => prev.filter(track => track !== id))
        }
    }

    return (
        <div>
            <TextField className='bg-neutral-700 rounded w-full mb-3' value={search.query} onChange={search.search} placeholder="Search"/>
            {tracks && tracks.map(track => {
                if(!track.album) {
                    return (
                        <div className='mx-auto flex max-w-2xl justify-between my-1 bg-gray-900/50 items-center'>
                            <div className='flex flex-row m-2 items-center'>
                                <img className='w-10 h-10 mr-3' src={`http://localhost:5000/${track.picture}`}
                                     alt="track image"/>
                                <p>{track.name}</p>
                            </div>
                            <button className='px-1 px-1' onClick={() => handleTrack(track._id)}>
                                {selected.includes(track._id) ? <DoneIcon/> : <AddIcon/>}
                            </button>
                        </div>
                    )
                } else {
                    return (
                        <div className='mx-auto flex max-w-2xl justify-between my-1 bg-gray-900/50 items-center relative'>
                            <div className='flex flex-row m-2 items-center'>
                                <img className='w-10 h-10 mr-3' src={`http://localhost:5000/${track.picture}`}
                                     alt="track image"/>
                                <p>{track.name}</p>
                            </div>
                            <button className='px-1 px-1'>
                                {selected.includes(track._id) ? <DoneIcon/> : <AddIcon/>}
                            </button>
                            <div className="flex rounded justify-center bg-black/50 items-center absolute top-0 left-0 h-full w-full">
                                <h1 className='text-3xl'>Track already exist in album</h1>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    );
};

export default AlbumSelect;

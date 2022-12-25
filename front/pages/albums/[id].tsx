import React, {useState} from "react";
import {GetServerSideProps} from "next";
import axios from "axios";

import MainLayout from "../../layouts/MainLayout";

import TrackList from "../../components/TrackList";
import TrackItem from "../../components/TrackItem";import Header from "../../components/Header/Header";

import {TextField} from "@mui/material";

import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useSearch} from "../../hooks/useSearch";
import {IAlbum} from "../../types/album";

const AlbumPage = ({ServerAlbum}) => {
    const {tracks, error} = useTypedSelector(state => state.track)
    const {query, search} = useSearch()
    const [album, setAlbum] = useState<IAlbum>(ServerAlbum)

    const onAddTrack = async(track) => {
        try {
            await axios.post(`http://localhost:5000/albums/${album._id}`, {trackId: track._id})
            setAlbum({...album, tracks: [...album.tracks, track]})
        } catch(err) {
            console.log('Error adding track - ', err.message)
        }
    }

    const onRemoveTrack = async(track) => {
        try {
            await axios.post(`http://localhost:5000/albums/remove-track/${album._id}`, {trackId: track._id})
            setAlbum({...album, tracks: album.tracks.filter(t => t._id !== track._id)})
        } catch (err) {
            console.log('Error deleting track - ', err.message)
        }
    }
    return (
        <MainLayout title={'Music Platform - ' + album.name + ' - ' + album.author} description={'Music platform, track: ' + album.name + ' by ' + album.author}>
            <Header data={album} type='album' />
            <TrackList onRemoveTrack={onRemoveTrack} type='forAlbum' tracks={album.tracks} />
            <div className='mx-12 mb-3 gradient'>
                <h2 className='text-3xl mb-2'>You can add tracks to your album</h2>
                <TextField
                    fullWidth
                    className='bg-neutral-700 rounded w-2/5'
                    value={query}
                    onChange={search}
                />
            {query.length > 0 && tracks.map(track => {
                if (!track.album) {
                    return (
                        <TrackItem onAddTrack={onAddTrack} key={track._id} track={track} isAlbumSearch={true}/>
                    )
                } else {
                    return (
                        <TrackItem disabled={true} onAddTrack={onAddTrack} key={track._id} track={track} isAlbumSearch={true}/>
                    )
                }
            })}
            </div>
        </MainLayout>
    );
};


export const getServerSideProps: GetServerSideProps = async({params}) => {
    const res = await axios.get('http://localhost:5000/albums/' + params.id)

    return {
        props: {
            ServerAlbum: res.data
        },
    };
}

export default AlbumPage;

import React from 'react';
import Navbar from "../../components/navbar";
import MainLayout from "../../layouts/MainLayout";
import {Button, Card, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/action-creators/track";
import {fetchAlbums} from "../../store/action-creators/album";
import AlbumList from "../../components/AlbumList/AlbumList";

const Albums = () => {
    const {albums, error} = useTypedSelector(state => state.album)
    console.log(albums)
    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }
    return (
        <MainLayout title={'Album List - Music Platform'} description={'Music Platform - listen to the best music'}>
           <main>
               <AlbumList albums={albums} />
           </main>
        </MainLayout>
    );
};

export default Albums;
export const getServerSideProps = wrapper.getServerSideProps(store => {
    return async () => {
        // @ts-ignore
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchAlbums())
        return {props: {}}
    };
})



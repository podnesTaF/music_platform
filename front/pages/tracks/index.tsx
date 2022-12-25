import React, {useEffect, useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/action-creators/track";
import {useDispatch} from "react-redux";
import {useSearch} from "../../hooks/useSearch";


const Index = () => {
    const {tracks, error} = useTypedSelector(state => state.track)
    const [offset, setOffset] = useState(1)
    const [fetching, setFetching] = useState(true)

    const search = useSearch()
    const dispatch = useDispatch() as NextThunkDispatch;

    useEffect(() => {
        if(fetching) {
            (async () => {
                await dispatch(await fetchTracks(offset))
                setOffset(prev => prev + 3)
                setFetching(false)
            })()

        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])


    const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 50) {
            setFetching(true)
        }

    }

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={'Track List - Music Platform'} description={'Music Platform - listen to the best music'}>
            <div className='flex flex-column w-full h-full justify-center border-black border-2 bg-zinc-900'>
                <div className='w-full flex flex-col'>
                    <div className='p-1'>
                        <div className='flex justify-between'>
                            <h1 className='text-4xl font-bold ml-4 mb-3'>TrackList</h1>
                        </div>
                    </div>
                    <input
                        className='bg-neutral-500/20 text-gray-300 w-1/2 ml-4 py-2 px-3 rounded placeholder:text-slate-400'
                        placeholder='Search Tracks'
                        value={search.query}
                        onChange={search.search}
                    />
                    <TrackList tracks={tracks}/>
                </div>
            </div>
        </MainLayout>
    )
}

export default Index;


export const getServerSideProps = wrapper.getServerSideProps(store => {
    return async () => {
        // @ts-ignore
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchTracks(0))
        return {props: {}}
    };
})


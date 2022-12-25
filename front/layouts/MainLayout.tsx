import React, {useEffect } from 'react';
import Navbar from "../components/navbar";
import Player from "../components/Player";
import Head from "next/head";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface MainLayoutProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
}
const MainLayout: React.FC<MainLayoutProps> = ({children, title, description}) => {
    const {active} = useTypedSelector(state => state.player)
    return (
        <>
            <Head>
                <meta name='description' content={description || 'Music platform, listen to the best tracks'} />
                <meta name='robots' content='index, follow' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{title || 'Music platform'}</title>
            </Head>
            <div>
                <Navbar/>
                <div style={{marginLeft: '240px', marginBottom: active ? '80px' : 0}}>
                    {children}
                </div>
                <Player />
            </div>
        </>
    );
};

export default MainLayout;

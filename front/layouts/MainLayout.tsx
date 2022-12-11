import React, {useEffect } from 'react';
import Navbar from "../components/navbar";
import {Container} from "@mui/system";
import Player from "../components/Player";
import Head from "next/head";
import {useTypedSelector} from "../hooks/useTypedSelector";
import { useActions } from '../hooks/useActions';

interface MainLayoutProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
}
const MainLayout: React.FC<MainLayoutProps> = ({children, title, description}) => {
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
                <div style={{marginLeft: '240px'}}>
                    {children}
                </div>
                <Player />
            </div>
        </>
    );
};

export default MainLayout;

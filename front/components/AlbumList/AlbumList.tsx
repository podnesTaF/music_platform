import React from 'react';
import styles from './AlbumList.module.scss'
import AlbumItem from "../AlbumItem/AlbumItem";
import { useRouter } from 'next/router';
const AlbumList = ({albums}) => {
    const router = useRouter()
    return (
        <main className={styles.main}>
            <div className={styles.title}>
                <h1>Albums Page</h1>
            </div>
            <hr/>
            <div className={styles.wrapper}>
                {albums.map((album) => (
                        <AlbumItem key={album._id} album={album} />
                ))}
            </div>
        </main>
    );
};

export default AlbumList;

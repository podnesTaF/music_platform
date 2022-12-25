import React from 'react';
import { IAlbum } from '../../types/album';
import styles from './AlbumItem.module.scss'
import {useRouter} from "next/router";
interface AlbumItemProps {
    album: IAlbum;
}
const AlbumItem: React.FC<AlbumItemProps> = ({album}) => {
    const router = useRouter()

    return (
        <article onClick={() => router.push(`/albums/${album._id}`)} className={styles.wrapper}>
            <div className='rounded'>
                {album.picture ? <img className='w-50 h-auto' src={`http://localhost:5000/${album.picture}`} alt="album image"/> :  <img className='w-50 h-auto' src="https://static-cse.canva.com/blob/978204/1600w-fxYFTKLArdY.jpg" alt="album"/>}
            </div>
            <div className={styles.play}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
            </div>
            <div className='flex flex-col text-left w-full'>
                <h3 className='text-white text-2xl'>{album.name}</h3>
                <p className='text-gray-300'>{album.author}</p>
            </div>
        </article>
    );
};

export default AlbumItem;

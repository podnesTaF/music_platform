import React from 'react';
import styles from './Header.module.scss'
import Link from "next/link";
interface HeaderProps {
    data: any;
    type: 'album' | 'track'
}
const Header: React.FC<HeaderProps> = ({data, type}) => {

    if (type === 'album') {
        return (
            <header className={styles.header}>
                <div className={styles.imageWrapper}>
                    {!data.picture ? <img src='https://static-cse.canva.com/blob/978204/1600w-fxYFTKLArdY.jpg' alt="Album cover" /> : <img src={`http://localhost:5000/${data.picture}`} alt="Album cover" />}
                </div>
                <div className={styles.contentWrapper}>
                    <h4>Album</h4>
                    <h4>{data.name}</h4>
                    <h5> {data.author} * 2022 * {data.tracks.length} tracks</h5>
                </div>
            </header>
        );
    } else {
        return (
            <header className={styles.header}>
                <div className={styles.imageWrapper}>
                    {!data.picture ? <img src='https://static-cse.canva.com/blob/978204/1600w-fxYFTKLArdY.jpg' alt="Album cover" /> : <img src={`http://localhost:5000/${data.picture}`} alt="Album cover" />}
                </div>
                <div className={styles.contentWrapper}>
                    <h4>Track</h4>
                    {data.name}
                    <h5> {data.artist} </h5>
                    <h5>{data.listens} listens</h5>
                </div>
                <div className='absolute top-4 right-4'>
                    <Link className='bg-inherit px-5 py-3 rounded border-2 border-gray-300/25 hover:opacity-40' href='/tracks'>
                        To the list
                    </Link>
                </div>
            </header>
        );
    }
};

export default Header;

import React, {useState} from 'react';
import { IAlbum } from '../../types/album';
import { ITrack } from '../../types/track';
import styles from './Header.module.scss'
interface HeaderProps {
    data: IAlbum;
    type: 'album' | 'track'
}
const Header: React.FC<HeaderProps> = ({data, type}) => {
    const [image, setImage] = useState(data.picture || null);
    const [name, setName] = useState(data.name || null);
    const [artist, setArtist] = useState(data.author || null);
    const [description, setDescription] = useState(data.description || null);

    if (type === 'album') {
        return (
            <header className={styles.header}>
                <div className={styles.imageWrapper}>
                    {!description ? <img src='https://static-cse.canva.com/blob/978204/1600w-fxYFTKLArdY.jpg' alt="Album cover" /> : <img src={`http://localhost:5000/${image}`} alt="Album cover" />}
                </div>
                <div className={styles.contentWrapper}>
                    <h4>Album</h4>
                    {!name && <input />}
                    <h5> {data.author} * 2022 * 18 tracks</h5>
                </div>
            </header>
        );
    }
};

export default Header;

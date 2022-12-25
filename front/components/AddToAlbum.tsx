import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useState} from "react";
import {IAlbum} from "../types/album";


interface AddToAlbumProps {
    albums?: IAlbum[];
    setAlbum?: Function;

}
export const AddToAlbum: React.FC<AddToAlbumProps> = ({albums, setAlbum}) => {
    const [selected, setSelected] = useState(null)
    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value as string);
            setAlbum(selected)
    };

    return (
        <Box sx={{ width: '100%' }}>
            <FormControl fullWidth>
                {albums && <InputLabel id="select">Choose Album</InputLabel>}
                <Select
                    labelId="demo-simple-select-label"
                    id="select"
                    value={selected}
                    label="yop"
                    onChange={handleChange}
                >
                    {albums && albums.map(album => (
                      <MenuItem key={album._id} value={album._id}>{album.name}</MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    );
}
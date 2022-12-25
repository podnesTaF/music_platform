import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";

import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/action-creators/track";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useInput} from "../../hooks/useInput";

import {Button, Grid, TextField} from "@mui/material";

import MainLayout from "../../layouts/MainLayout";
import FileUpload from "../../components/FileUpload";
import StepWrapper from "../../components/StepWrapper";
import AlbumSelect from "../../components/AlbumSelect";




const CreateAlbumPage = () => {
    const router = useRouter()
    const {tracks} = useTypedSelector(state => state.track)
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const name = useInput('')
    const author = useInput('')
    const description = useInput('')
    const [selectedTracks, setSelectedTracks] = useState([])

    useEffect(() => {
        if (!picture) return
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(picture)

    }, [picture]);

    const next = () => {
        if(activeStep !== 2){
            setActiveStep(prev => prev + 1)
        } else {
            const albumTracks = selectedTracks.join(',')
            const formData = new FormData();
            formData.append('name', name.value)
            formData.append('author', author.value)
            formData.append('description', description.value)
            formData.append('picture', picture)
            formData.append('tracks', albumTracks)
            axios.post('http://localhost:5000/albums', formData).then(res => router.push('/albums')).catch(err => console.log(err))
        }
    }

    const previous = () => {
        setActiveStep(prev => prev - 1)
    }

    return (
        <MainLayout title='Music Platform - create album'>
                <StepWrapper type='album' activeStep={activeStep}>
                    {activeStep === 0 &&
                        <Grid container direction={'column'} className='p-5 bg-white/50 rounded'>
                            <TextField
                                {...name}
                                className='mt-2'
                                label="Album name"
                            />
                            <TextField
                                {...author}
                                className='mt-2'
                                label="Author"
                            />
                            <TextField
                                {...description}
                                className='mt-2'
                                label="Description"
                                multiline
                                rows={3}
                            />
                        </Grid>
                    }
                    {activeStep === 1 && <FileUpload setFile={setPicture} accept={'image/*'}>
                        <Button className='text-white'>Upload cover image</Button>
                        {previewUrl && <img className='h-60 w-60 object-cover m-auto' src={previewUrl} alt='Preview'/>}
                    </FileUpload>}
                    {activeStep === 2 && <AlbumSelect setTracks={setSelectedTracks} tracks={tracks} />}
                    <Grid container justifyContent='space-between' className='max-w-3xl mx-auto'>
                        <Button className='text-white disabled:text-gray-500' disabled={activeStep === 0} onClick={previous}>Previous</Button>
                        <Button className='text-white' onClick={next}>{activeStep === 2 ? 'Upload the album' : 'Next'}</Button>
                    </Grid>
                </StepWrapper>
        </MainLayout>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => {
    return async () => {
        // @ts-ignore
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchTracks())
        return {props: {}}
    };
})
export default CreateAlbumPage;

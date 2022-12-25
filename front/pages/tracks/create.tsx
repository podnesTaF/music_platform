import React, {useEffect, useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid, TextField} from "@mui/material";
import StepWrapper from "../../components/StepWrapper";
import FileUpload from '../../components/FileUpload';
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";
import {AddToAlbum} from "../../components/AddToAlbum";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchAlbums} from "../../store/action-creators/album";

const CreateTrack = () => {
    const router = useRouter()
    const {albums} = useTypedSelector(state => state.album)
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const [album, setAlbum] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [audioPreview, setAudioPreview] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')

    useEffect(() => {
        if (!picture) return
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(picture)

    }, [picture]);

    useEffect(() => {
        if (!audio) return
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setAudioPreview(fileReader.result)
        }
        fileReader.readAsDataURL(audio)
    }, [audio]);
    const next = () => {
        if (activeStep !== 3) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData();
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            formData.append('text', text.value)
            formData.append('album', album)
            axios.post('http://localhost:5000/tracks', formData).then(res => router.push('/tracks')).catch(err => console.log(err))
        }
    }

    const previous = () => {
        setActiveStep(prev => prev - 1)
    }

    return (
        <MainLayout>
            <StepWrapper  type= 'track' activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={'column'} className='p-5 bg-white/50 rounded'>
                        <TextField
                            {...name}
                            style={{marginTop: 10}}
                            label="Track name"
                        />
                        <TextField
                            {...artist}
                            style={{marginTop: 10}}
                            label="Singer"
                        />
                        <TextField
                            {...text}
                            style={{marginTop: 10}}
                            label="Lyrics"
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {activeStep === 1 && <FileUpload setFile={setPicture} accept={'image/*'}>
                    <Button className='text-white'>Upload cover image</Button>
                    {previewUrl && <img className='h-60 w-60 object-cover m-auto' src={previewUrl} alt='Preview'/>}
                </FileUpload>}
                {activeStep === 2 &&
                    <FileUpload setFile={setAudio} accept={'audio/*'}>
                        <Button className='text-white'>Upload your track</Button>
                            {previewUrl && <img className='h-48 w-48 object-cover m-auto' src={previewUrl} alt='Preview'/>}
                            {audioPreview && <audio className='mx-auto my-4' controls>
                                <source src={audioPreview} type="audio/*" />
                                Your browser does not support the audio element.
                            </audio>}
                    </FileUpload>
                }
                {activeStep === 3 && <AddToAlbum setAlbum={setAlbum} albums={albums} />}
            </StepWrapper>
            <Grid container justifyContent='space-between' className='max-w-3xl mx-auto'>
                <Button className='text-white disabled:text-gray-500' disabled={activeStep === 0} onClick={previous}>Previous</Button>
                <Button className='text-white' onClick={next}>{activeStep === 3 ? 'Upload the track' : 'Next'}</Button>
            </Grid>
        </MainLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => {
    return async () => {
        // @ts-ignore
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchAlbums())
        return {props: {}}
    };
})
export default CreateTrack;

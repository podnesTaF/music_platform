import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "../store";
import {searchTracks} from "../store/action-creators/track";

export const useSearch = () => {
    const [query, setQuery] = useState<string>('')
    const [timer, setTimer] = useState(null)
    const dispatch = useDispatch() as NextThunkDispatch;
    const search = async(e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if(timer) {
            clearTimeout(timer)
        }
        setTimer(setTimeout(async() => {
            await dispatch( await searchTracks(e.target.value))
        }, 500))
    }
    return {query, search}
}
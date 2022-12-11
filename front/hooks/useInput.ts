import React, { useState } from "react"

export const useInput = (initialState, type = 'input') => {
    const [value, setValue] = useState(initialState)
    let onChange
    if(type === 'input') {
        onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
        }
    } else if(type === 'textarea') {
        onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value)
        }
    }



    return {value, onChange}
}
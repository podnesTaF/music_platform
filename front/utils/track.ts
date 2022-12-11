export const timeTransform = (time) => {
    const seconds = time % 60
    const minutes = (time - seconds) / 60
    return `${minutes < 10 ? `0${minutes}` : minutes }:${seconds < 10 ? `0${seconds}` : seconds}`
}
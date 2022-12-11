import React from 'react';
import {timeTransform} from "../utils/track";

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e) => void;
    type?: string
}
const TrackProgress: React.FC<TrackProgressProps> = ({type, left, right, onChange}) => {
    return (
        <div style={{display: 'flex'}}>
            <input type="range" min={0} max={right} value={left} onChange={onChange} />
            <div>{type !== 'volume' ? `${timeTransform(left)} / ${timeTransform(right)}`: `${left} / ${right}` } </div>
        </div>
    );
};

export default TrackProgress;

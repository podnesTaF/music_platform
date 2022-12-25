import * as React from 'react';
import { Step, StepLabel, Stepper} from "@mui/material";

interface StepWrapperProps {
    activeStep: number;
    type: 'album' | 'track'
    children?: React.ReactNode;
}

const trackSteps = ['Track info', 'Cover image uploading', 'Audio uploading', 'Add to Album']

const albumSteps = ['Album info', 'Cover image uploading', 'Add to Album']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children, type}) => {

    return (
        <div className='max-w-5xl pt-10 mx-auto'>
            <Stepper color='white' activeStep={activeStep}>
                {type === 'track' ? trackSteps.map((step, idx) =>
                    <Step key={idx} completed={activeStep > idx}>
                        <StepLabel>
                            <p className='text-white'>{step}</p>
                        </StepLabel>
                    </Step>
                ) : (
                    albumSteps.map((step, idx) =>
                        <Step key={idx} completed={activeStep > idx}>
                            <StepLabel>
                                <p className='text-white'>{step}</p>
                            </StepLabel>
                        </Step>
                    )
                    )}
            </Stepper>
            <div className='mt-10 mx-auto max-w-4xl'>
                <div className='max-w-3xl mx-auto'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default StepWrapper;

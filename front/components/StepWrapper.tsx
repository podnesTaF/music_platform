import * as React from 'react';
import {Container} from "@mui/system";
import { Step, StepLabel, Stepper} from "@mui/material";

interface StepWrapperProps {
    activeStep: number;
    children?: React.ReactNode;
}

const steps = ['Track info', 'Cover image uploading', 'Audio uploading', 'Add to Album']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((step, idx) =>
                    <Step key={idx} completed={activeStep > idx}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <div style={{margin: '70px 0', height: 270}}>
                <div style={{width: 600}}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default StepWrapper;

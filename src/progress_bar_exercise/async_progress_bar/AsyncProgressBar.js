import React, { useEffect, useState } from "react";
import { ProgressBar } from "../progress_bar/ProgressBar";

export default function AsyncProgressBar({requestState = 'inactive', breakpoints = [], onFinished} = {}) {
    if (!['inactive', 'started', 'finished'].includes(requestState)) {
        console.error(`Invalid requestState ${requestState} passed`);
    }
    
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [slowCounter, setSlowCounter] = useState(0);

    useEffect(() => {
        let progressInterval;
        if (requestState === 'started') {
            setFadeOut(false)
            
            progressInterval = setInterval(() => {
                if (progress <= 90) {
                    if (breakpoints.includes(progress + 5) || slowCounter > 0) {
                        setSlowCounter(slowCounter + 1)
                        setProgress(progress + 0.1)
                        if (slowCounter >= 20) {
                            setSlowCounter(0)
                            setProgress(Math.ceil(progress)) // to fix floating point issues.
                        }
                    } else {
                        setProgress(progress + 1)
                    }
                }
           }, 100)
        } else if (requestState === 'finished') {
            setProgress(100);
            clearInterval(progressInterval)
            // let the progress bar finish animating to the end.
            setTimeout(() => {
                setFadeOut(true)
            }, 1000)

            // call onFinished and reset the progress to 0 after the bar fades out.
            setTimeout(() => {
                onFinished()
                setProgress(0)
            }, 4000) // 1s for finishing, 2s wait, 1s fadeout

            clearInterval(progressInterval);
        } 
        return () => clearInterval(progressInterval)
    }, [progress, breakpoints, slowCounter, onFinished, requestState])

    return requestState !== 'inactive' ? <ProgressBar progress={progress} fadeOut={fadeOut}></ProgressBar> : null
}
import React, { useEffect, useState } from "react";
import { ProgressBar } from "../progress_bar/ProgressBar";

export default function AsyncProgressBar({requestState = 'inactive', onFinished} = {}) {
    if (!['inactive', 'started', 'finished'].includes(requestState)) {
        console.error(`Invalid requestState ${requestState} passed`);
    }
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        let progressInterval;
        if (requestState === 'started') {
            setFadeOut(false)
            progressInterval = setInterval(() => {
                if (progress <= 90) {
                    setProgress(progress + 1)
               }
           }, 110)
        } else if (requestState === 'finished') {
            setProgress(100);
            // let the progress bar finish animating to the end.
            setTimeout(() => {
                setFadeOut(true)
            }, 1000)

            // call onFinished and reset the progress to 0 after the bar fades out.
            setTimeout(() => {
                onFinished()
                setProgress(0)
            }, 5000) // 1s for finishing, 3s wait, 1s fadeout

            clearInterval(progressInterval);
        } 

        return () => clearInterval(progressInterval)
    }, [requestState, progress, onFinished])

    return requestState !== 'inactive' ? <ProgressBar progress={progress} fadeOut={fadeOut}></ProgressBar> : null
}
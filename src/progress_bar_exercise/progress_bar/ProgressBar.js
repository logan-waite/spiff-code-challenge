import React from "react"

export function ProgressBar({progress, fadeOut}) {
    const percent = progress > 100 ? 100 
                    : progress < 0 ? 0 
                    : progress;
    // get viewport width
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // calculate the amount that needs to be hidden
    const percentHidden = 100 - percent;
    const hiddenAmount = percentHidden * vw / 100

    return <div className={`progress-bar ${fadeOut ? 'progress-bar--fade-out' : ''}`} style={{clipPath: `inset(0px ${hiddenAmount}px 0px 0px)`}}></div>
}
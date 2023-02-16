import React, { useEffect, useState } from "react";

export function ProgressBar({ progress, onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  const percent = progress > 100 ? 100 : progress < 0 ? 0 : progress;
  // get viewport width
  const vw = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  // calculate the amount that needs to be hidden
  const percentHidden = 100 - percent;
  const hiddenAmount = (percentHidden * vw) / 100;

  useEffect(() => {
    if (percent === 100) {
      // let the progress bar finish animating to the end.
      setTimeout(() => {
        setFadeOut(true);
      }, 1000);

      setTimeout(() => {
        onFinish();
        setFadeOut(false);
      }, 4000); // 1s for finishing, 2s wait, 1s fadeout
    }
  }, [percent, onFinish]);

  return (
    <div
      className={`progress-bar ${fadeOut ? "progress-bar--fade-out" : ""}`}
      style={{ clipPath: `inset(0px ${hiddenAmount}px 0px 0px)` }}
    ></div>
  );
}

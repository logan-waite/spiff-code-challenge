import React, { useEffect, useState } from "react";
import { ProgressBar } from "../progress_bar/ProgressBar";

export default function AsyncProgressBar({
  requestState = "inactive",
  breakpoints = [],
  onFinished,
} = {}) {
  if (!["inactive", "started", "finished"].includes(requestState)) {
    console.error(`Invalid requestState ${requestState} passed`);
  }

  const [progress, setProgress] = useState(0);
  const [slowCounter, setSlowCounter] = useState(0);

  useEffect(() => {
    function incrementProgressSlowly() {
      setSlowCounter(slowCounter + 1);
      setProgress(progress + 0.1);
      if (slowCounter >= 20) {
        setSlowCounter(0);
        setProgress(Math.round(progress)); // to fix floating point issues.
      }
    }

    let progressInterval;
    switch (requestState) {
      case "started":
        progressInterval = setInterval(() => {
          if (progress <= 90) {
            if (breakpoints.includes(progress + 1) || slowCounter > 0) {
              incrementProgressSlowly();
            } else {
              setProgress(progress + 1);
            }
          }
        }, 100);
        break;
      case "finished":
        setProgress(100);
        clearInterval(progressInterval);
        break;
      default:
        setProgress(0);
        setSlowCounter(0);
        clearInterval(progressInterval);
    }

    return () => clearInterval(progressInterval);
  }, [progress, breakpoints, slowCounter, onFinished, requestState]);

  function handleFinish() {
    setProgress(0);
    onFinished();
  }

  return requestState !== "inactive" ? (
    <ProgressBar progress={progress} onFinish={handleFinish}></ProgressBar>
  ) : null;
}

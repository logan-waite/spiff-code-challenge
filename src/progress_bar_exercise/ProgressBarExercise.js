import React, { useState } from "react";
import Exercise from "../exercise/Exercise";
import AsyncProgressBar from "./async_progress_bar/AsyncProgressBar";
import OutlineButton from "./outline_button/OutlineButton";

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  const [requestState, setRequestState] = useState("inactive");
  const [breakpointBar, setBreakpointBar] = useState(false);

  function GreenButton(props) {
    return (
      <OutlineButton className="outline_button--green" {...props}>
        {props.children}
      </OutlineButton>
    );
  }

  function RedButton(props) {
    return (
      <OutlineButton className={"outline_button--red"} {...props}>
        {props.children}
      </OutlineButton>
    );
  }

  return (
    <div>
      <AsyncProgressBar
        requestState={requestState}
        onFinished={() => setRequestState("inactive")}
        breakpoints={breakpointBar ? [25, 50, 75] : []}
      />
      <div className="buttons">
        <GreenButton
          onClick={() => setRequestState("started")}
          disabled={requestState !== "inactive"}
        >
          {requestState === "started" ? "Loading..." : "Start Request"}
        </GreenButton>
        <RedButton
          onClick={() => setRequestState("finished")}
          disabled={requestState !== "started"}
        >
          Finish Request
        </RedButton>
      </div>
      <OutlineButton onClick={() => setBreakpointBar(!breakpointBar)}>{`${
        breakpointBar ? "Using" : "Not Using"
      } Breakpoints`}</OutlineButton>
    </div>
  );
};

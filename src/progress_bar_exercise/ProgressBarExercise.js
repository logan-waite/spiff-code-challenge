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
  const [requestState, setRequestState] = useState('inactive')
  const [breakpointBar, setBreakpointBar] = useState(false);

  function startRequest() {
    setRequestState('started')
  }

  function finishRequest() {
    setRequestState('finished')
  }

  function deactivateRequest() {
    setRequestState('inactive');
  }
return (<div>
    <AsyncProgressBar requestState={requestState} onFinished={deactivateRequest} breakpoints={breakpointBar ? [15, 45, 75] : []} />
    <div className="buttons" style={{display: 'flex', width: '350px', height: '50px', alignItems: 'center', justifyContent: 'space-between'}}>
      <OutlineButton color='green' onClick={startRequest} disabled={requestState === 'started'}>{requestState === 'started' ? 'Loading...' : 'Start Request' }</OutlineButton>
      <OutlineButton color='red' onClick={finishRequest} disabled={requestState !== 'started'}>Finish Request</OutlineButton>
    </div>
      <OutlineButton onClick={() => setBreakpointBar(!breakpointBar)}>{`${breakpointBar ? 'Using' : 'Not Using'} Breakpoints`}</OutlineButton>

  </div>);
};

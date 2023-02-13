import React from "react";
import Exercise from "../exercise/Exercise";
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
  return <div>
    <ProgressBar progress={90}></ProgressBar>
    <OutlineButton color='green' onClick={() => console.log('start clicked')}>Start Request</OutlineButton>
    <OutlineButton color='red' onClick={() => console.log('finish clicked')}>Finish Request</OutlineButton>
  </div>;
};

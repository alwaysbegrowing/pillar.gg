import React from 'react';
import Prompt from './Prompt';
import Stages from './Stages';

function GameplayPrompt({ stage, onNext, onCancel }) {
  return stage !== Stages.SELECT_VID ? null : (
    <Prompt
      title="Select Your Gameplay"
      text="Position and resize the window over your desired gameplay region."
      onNext={onNext}
      onCancel={onCancel}
      buttonText="Next"
    />
  );
}

export default GameplayPrompt;

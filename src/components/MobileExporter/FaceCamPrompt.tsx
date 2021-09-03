import React from 'react';
import Prompt from './Prompt';
import Stages from './Stages';

function FaceCamPrompt({ onNext, onCancel, stage }) {
  return stage !== Stages.SELECT_FACE ? null : (
    <Prompt
      title="Select Your Face"
      text="Position and resize the window over your face camera."
      onNext={onNext}
      onCancel={onCancel}
      buttonText="Next"
    />
  );
}

export default FaceCamPrompt;

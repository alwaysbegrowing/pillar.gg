import React from 'react';
import Prompt from './Prompt';

function FaceCamPrompt({ onNext }) {
  return (
    <Prompt
      title="Select Your Face"
      text="Position and resize the window over your face camera."
      onNext={onNext}
      buttonText="Next"
    />
  );
}

export default FaceCamPrompt;

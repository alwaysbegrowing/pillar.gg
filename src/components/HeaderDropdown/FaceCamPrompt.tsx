import React from 'react';
import Prompt from './Prompt';

function FaceCamPrompt({ onNext, onCancel }) {
  return (
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

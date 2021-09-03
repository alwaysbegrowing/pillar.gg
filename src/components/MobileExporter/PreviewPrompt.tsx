import React from 'react';
import Prompt from './Prompt';
import Stages from './Stages';

function PreviewPrompt({ stage, onNext, onCancel }) {
  return stage !== Stages.PREVIEW ? null : (
    <Prompt
      title="Preview Results"
      text="Verify the footage looks correct."
      onNext={onNext}
      onCancel={onCancel}
      buttonText="Accept and Export"
    />
  );
}

export default PreviewPrompt;

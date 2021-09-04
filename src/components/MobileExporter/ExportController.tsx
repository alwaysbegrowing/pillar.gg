import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import FaceCamPrompt from './FaceCamPrompt';
import HighlightPrompt from './HighlightPrompt';
import PreviewPrompt from './PreviewPrompt';
import Stages from './Stages';
import templates from './Templates';
import useVideoCropper from '@/services/hooks/useVideoCropper';

const GUTTER_SIZE = 24;

function ExportController({ onConfirm, onCancel }) {
  const [template, setTemplate] = useState(templates[0]);
  const [stage, setStage] = useState(Stages.SELECT_TEMPLATE);
  const [faceCropDimensions, setFaceCropDimensions] = useState({});
  const [highlightCropDimensions, setHighlightCropDimensions] = useState({});
  const faceCamCropper = useVideoCropper(template.face?.aspect, GUTTER_SIZE);
  const highlightCropper = useVideoCropper(template.highlight.aspect, GUTTER_SIZE);

  const handleTemplateSelected = (selection) => {
    setTemplate(selection);
    if (selection.face) {
      setStage(Stages.SELECT_FACE);
    } else {
      setStage(Stages.SELECT_HIGHLIGHT);
    }
  };

  const handleFaceCamSelected = () => {
    setFaceCropDimensions(faceCamCropper.getCropData());
    setStage(Stages.SELECT_HIGHLIGHT);
  };

  const handleGameplaySelected = () => {
    setHighlightCropDimensions(highlightCropper.getCropData());
    setStage(Stages.PREVIEW);
  };

  const handlePreviewAccepted = () =>
    onConfirm(faceCropDimensions, highlightCropDimensions, template);

  return (
    <>
      <TemplateSelector stage={stage} onSelect={handleTemplateSelected} />
      {template.face && (
        <FaceCamPrompt
          stage={stage}
          template={template}
          cropper={faceCamCropper}
          onNext={handleFaceCamSelected}
          onCancel={onCancel}
        />
      )}
      <HighlightPrompt
        stage={stage}
        template={template}
        cropper={highlightCropper}
        onNext={handleGameplaySelected}
        onCancel={onCancel}
      />
      <PreviewPrompt
        stage={stage}
        template={template}
        faceCropDimensions={faceCropDimensions}
        highlightCropDimensions={highlightCropDimensions}
        onNext={handlePreviewAccepted}
        onCancel={onCancel}
      />
    </>
  );
}

export default ExportController;

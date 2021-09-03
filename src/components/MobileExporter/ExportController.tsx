import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import FaceCamPrompt from './FaceCamPrompt';
import GameplayPrompt from './GameplayPrompt';
import PreviewPrompt from './PreviewPrompt';
import Stages from './Stages';
import templates from './Templates';

function ExportController({ onConfirm, onCancel }) {
  const [template, setTemplate] = useState(templates[0]);
  const [stage, setStage] = useState(Stages.SELECT_TEMPLATE);
  const [faceCropDimensions, setFaceCropDimensions] = useState({});
  const [videoCropDimensions, setVideoCropDimensions] = useState({});

  const getCropData = () => {
    // const cropper = getCropper();
    // const cropDimensions = cropper.getCropBoxData();
    // const onScreenWidth: any = cropper.containerData.width;
    // const actualWidth: any = cropperRef?.current.width;
    // const scale = actualWidth / onScreenWidth;

    // return {
    //   left: cropDimensions.left * scale,
    //   top: cropDimensions.top * scale,
    //   width: cropDimensions.width * scale,
    //   height: cropDimensions.height * scale,
    // };
    return { left: 0, top: 0, width: 0, height: 0 };
  };

  const handleTemplateSelected = (selection) => {
    setTemplate(selection);
    setStage(Stages.SELECT_FACE);
  };

  const handleFaceCamSelected = () => {
    setFaceCropDimensions(getCropData());
    setStage(Stages.SELECT_VID);
  };

  const handleGameplaySelected = () => {
    setVideoCropDimensions(getCropData());
    setStage(Stages.PREVIEW);
  };

  const handlePreviewAccepted = () => onConfirm(faceCropDimensions, videoCropDimensions);

  return (
    <>
      <TemplateSelector stage={stage} onSelect={handleTemplateSelected} />
      <FaceCamPrompt
        stage={stage}
        template={template}
        onNext={handleFaceCamSelected}
        onCancel={onCancel}
      />
      <GameplayPrompt
        stage={stage}
        template={template}
        onNext={handleGameplaySelected}
        onCancel={onCancel}
      />
      <PreviewPrompt
        stage={stage}
        template={template}
        faceCropDimensions={faceCropDimensions}
        videoCropDimensions={videoCropDimensions}
        onNext={handlePreviewAccepted}
        onCancel={onCancel}
      />
    </>
  );
}

export default ExportController;

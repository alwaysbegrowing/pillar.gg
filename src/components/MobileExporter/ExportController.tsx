import React, { useState, useEffect } from 'react';
import TemplateSelector from './TemplateSelector';
import FaceCamPrompt from './FaceCamPrompt';
import HighlightPrompt from './HighlightPrompt';
import PreviewPrompt from './PreviewPrompt';
import Stages from './Stages';
import templates from './Templates';
import useVideoCropper from '@/services/hooks/useVideoCropper';

function ExportController({ videoUrl, onConfirm, thumbnailUrl, setDrawerWidth }) {
  const [template, setTemplate] = useState(templates[0]);
  const [stage, setStage] = useState(Stages.SELECT_TEMPLATE);
  const [faceCropDimensions, setFaceCropDimensions] = useState(null);
  const [highlightCropDimensions, setHighlightCropDimensions] = useState(null);
  const faceCamCropper = useVideoCropper(template.face?.aspect, videoUrl, thumbnailUrl);
  const highlightCropper = useVideoCropper(template.highlight.aspect, videoUrl, thumbnailUrl);

  const roundEven = (x: number): number => 2 * Math.round(x / 2);

  useEffect(() => {
    if (stage === Stages.SELECT_FACE || stage === Stages.SELECT_HIGHLIGHT) {
      setDrawerWidth('80vw');
    } else {
      setDrawerWidth(736);
    }
  }, [stage, setDrawerWidth]);
  const makeFullscreenCrops = () => {
    return {
      background: {
        x: roundEven(highlightCropDimensions.left),
        y: roundEven(highlightCropDimensions.top),
        width: roundEven(highlightCropDimensions.width),
        height: roundEven(highlightCropDimensions.height),
        res_x: 1080,
        res_y: 1920,
      },
    };
  };

  const makeSmallFacecamCrops = () => {
    return {
      content: {
        x: roundEven(highlightCropDimensions.left),
        y: roundEven(highlightCropDimensions.top),
        width: roundEven(highlightCropDimensions.width),
        height: roundEven(highlightCropDimensions.height),
        res_x: 1080,
        res_y: 1080,
      },
      facecam: {
        x: roundEven(faceCropDimensions.left),
        y: roundEven(faceCropDimensions.top),
        width: roundEven(faceCropDimensions.width),
        height: roundEven(faceCropDimensions.height),
        res_x: 560, // this is the max face size
        res_y: 420, // until we support custom resolutions
      },
      background: {
        x: 656,
        y: 0,
        width: 606,
        height: 1080,
        res_x: 1080,
        res_y: 1920,
      },
    };
  };

  const makeBlurredCrops = () => {
    return {
      content: {
        x: roundEven(highlightCropDimensions.left),
        y: roundEven(highlightCropDimensions.top),
        width: roundEven(highlightCropDimensions.width),
        height: roundEven(highlightCropDimensions.height),
        res_x: 1080,
        res_y: 1080,
      },
      background: {
        x: 656,
        y: 0,
        width: 606,
        height: 1080,
        res_x: 1080,
        res_y: 1920,
      },
    };
  };

  const handleTemplateSelected = (selectedTemplate): void => {
    setTemplate(selectedTemplate);
    if (selectedTemplate.face) {
      setStage(Stages.SELECT_FACE);
    } else {
      setStage(Stages.SELECT_HIGHLIGHT);
    }
  };

  const handleFaceCamSelected = (): void => {
    setFaceCropDimensions(faceCamCropper.getCropData());
    setStage(Stages.SELECT_HIGHLIGHT);
  };

  const handleGameplaySelected = (): void => {
    setHighlightCropDimensions(highlightCropper.getCropData());
    setStage(Stages.PREVIEW);
  };

  const handlePreviewAccepted = (): void => {
    let cropConfigs = {};

    switch (template.name) {
      case 'Fullscreen':
        cropConfigs = makeFullscreenCrops();
        break;
      case 'Small Facecam':
        cropConfigs = makeSmallFacecamCrops();
        break;
      case 'Blurred':
        cropConfigs = makeBlurredCrops();
        break;
      default:
        break;
    }

    onConfirm(cropConfigs);
  };

  return (
    <>
      <TemplateSelector stage={stage} onSelect={handleTemplateSelected} />
      {template.face && (
        <FaceCamPrompt
          stage={stage}
          template={template}
          cropper={faceCamCropper}
          onNext={handleFaceCamSelected}
        />
      )}
      <HighlightPrompt
        stage={stage}
        template={template}
        cropper={highlightCropper}
        onNext={handleGameplaySelected}
      />
      <PreviewPrompt
        stage={stage}
        template={template}
        faceCropDimensions={faceCropDimensions}
        highlightCropDimensions={highlightCropDimensions}
        onNext={handlePreviewAccepted}
      />
    </>
  );
}

export default ExportController;

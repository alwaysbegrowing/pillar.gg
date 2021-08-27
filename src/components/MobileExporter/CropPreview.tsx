import React from 'react';

function CropPreview({ face, video }) {
  return (
    <>
      <div>{JSON.stringify(face, null, 2)}</div>
      <br />
      <br />
      <div>{JSON.stringify(video, null, 2)}</div>
    </>
  );
}

export default CropPreview;

import React, { useState } from 'react';
import FilePicker from './FilePicker';
import { generateThumbnail } from './VideoProcessor';
import UploadProgress from './UploadProgress';
import MetadataForm from './MetadataForm';
import './uploadStyles.css';

const UploadWizard = () => {
  const [step, setStep] = useState('PICK'); 
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handlePublish = async (metadata) => {
    setStep('UPLOADING');
    
    const thumbnail = await generateThumbnail(file);
    const formData = new FormData();
    formData.append('video', file);
    formData.append('thumbnail', thumbnail);
    formData.append('title', metadata.title);
    formData.append('ingredients', metadata.ingredients);
    formData.append('tags', metadata.tags);

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        alert("Success! Your reel is live.");
        window.location.reload();
      } else {
        alert("Upload failed. Try again.");
        setStep('META');
      }
    };

    xhr.open('POST', '/api/v1/reels/upload');
    xhr.send(formData);
  };

  return (
    <div className="wizard-modal">
      <div className="wizard-content">
        {step === 'PICK' && <FilePicker onFileSelect={(f) => { setFile(f); setStep('META'); }} />}
        {step === 'META' && <MetadataForm onSubmit={handlePublish} />}
        {step === 'UPLOADING' && <UploadProgress percent={progress} />}
      </div>
    </div>
  );
};

export default UploadWizard;

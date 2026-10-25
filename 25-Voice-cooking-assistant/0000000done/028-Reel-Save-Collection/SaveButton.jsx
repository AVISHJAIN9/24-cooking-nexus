import React, { useState } from 'react';
import { toggleSaveApi } from './SaveService';
import CollectionModal from './CollectionModal';
import './collectionStyles.css';

const SaveButton = ({ reelId, isInitiallySaved }) => {
  const [isSaved, setIsSaved] = useState(isInitiallySaved);
  const [showModal, setShowModal] = useState(false);

  const handleSaveClick = async () => {
    // If already saved, we toggle off. If not, we open the collection picker.
    if (isSaved) {
      const success = await toggleSaveApi(reelId, false);
      if (success) setIsSaved(false);
    } else {
      setShowModal(true);
    }
  };

  const onConfirmSave = () => {
    setIsSaved(true);
    setShowModal(false);
  };

  return (
    <>
      <div className="save-action-container" onClick={handleSaveClick}>
        <div className={`save-icon ${isSaved ? 'saved' : ''}`}>
          <i className={isSaved ? "fas fa-bookmark" : "far fa-bookmark"}></i>
        </div>
        <span className="save-label">{isSaved ? 'Saved' : 'Save'}</span>
      </div>

      {showModal && (
        <CollectionModal 
          reelId={reelId} 
          onClose={() => setShowModal(false)} 
          onSuccess={onConfirmSave}
        />
      )}
    </>
  );
};

export default SaveButton;

import React, { useState, useEffect } from 'react';
import { fetchCollections, saveToCollection } from './SaveService';

const CollectionModal = ({ reelId, onClose, onSuccess }) => {
  const [collections, setCollections] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    fetchCollections().then(setCollections);
  }, []);

  const handleSelect = async (collectionId) => {
    const success = await saveToCollection(reelId, collectionId);
    if (success) onSuccess();
  };

  return (
    <div className="collection-modal-overlay">
      <div className="collection-modal-content">
        <h4>Save to Collection</h4>
        <div className="collection-list">
          {collections.map(folder => (
            <button key={folder._id} onClick={() => handleSelect(folder._id)}>
              <i className="fas fa-folder"></i> {folder.name}
            </button>
          ))}
        </div>
        <div className="new-collection-input">
          <input 
            placeholder="New Collection Name" 
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button onClick={() => handleSelect('new')}>Create</button>
        </div>
        <button className="close-modal" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CollectionModal;

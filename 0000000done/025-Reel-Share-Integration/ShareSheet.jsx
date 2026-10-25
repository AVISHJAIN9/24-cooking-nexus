import React from 'react';
import { handleNativeShare } from './NativeShare';
import { copyToClipboard } from './ClipboardUtil';
import './shareStyles.css';

const ShareSheet = ({ reel, isOpen, onClose }) => {
  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/reels/${reel._id}`;
  const shareTitle = `Check out this recipe: ${reel.title}`;

  const onNativeShare = async () => {
    const success = await handleNativeShare(shareTitle, shareUrl);
    if (success) onClose();
  };

  return (
    <div className="share-sheet-backdrop" onClick={onClose}>
      <div className="share-sheet-content" onClick={e => e.stopPropagation()}>
        <h3>Share to</h3>
        <div className="share-grid">
          <button onClick={onNativeShare} className="share-item native">
            <i className="fas fa-share-alt"></i>
            <span>More</span>
          </button>
          <a href={`https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`} className="share-item whatsapp">
            <i className="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
          </a>
          <button onClick={() => copyToClipboard(shareUrl)} className="share-item copy">
            <i className="fas fa-link"></i>
            <span>Copy Link</span>
          </button>
        </div>
        <button className="close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ShareSheet;

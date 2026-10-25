import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { fetchComments } from './ThreadLogic';
import './commentStyles.css';

const CommentSheet = ({ reelId, isOpen, onClose }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, reelId]);

  const loadData = async () => {
    const data = await fetchComments(reelId);
    setComments(data);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="comment-sheet-overlay">
      <div className="comment-sheet-header">
        <span>Comments</span>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="comment-list">
        {loading ? <div className="loader" /> : 
          comments.map(c => <CommentItem key={c._id} data={c} />)
        }
      </div>
      <CommentInput reelId={reelId} onSent={loadData} />
    </div>
  );
};

export default CommentSheet;

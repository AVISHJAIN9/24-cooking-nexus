import React, { useState } from 'react';

const CommentItem = ({ data, isReply = false }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className={`comment-item ${isReply ? 'reply' : ''}`}>
      <img src={data.user.avatar} alt="User" className="avatar-sm" />
      <div className="comment-content">
        <p><strong>{data.user.username}</strong> {data.text}</p>
        <div className="comment-meta">
          <span>{data.timestamp}</span>
          <button className="reply-btn">Reply</button>
          <button className="like-btn">❤️ {data.likes}</button>
        </div>
        
        {data.replies?.length > 0 && (
          <div className="replies-section">
            <button onClick={() => setShowReplies(!showReplies)}>
              {showReplies ? 'Hide replies' : `View ${data.replies.length} replies`}
            </button>
            {showReplies && data.replies.map(r => (
              <CommentItem key={r._id} data={r} isReply={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;

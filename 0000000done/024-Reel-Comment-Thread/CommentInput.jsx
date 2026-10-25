import React, { useState, useRef } from 'react';

const CommentInput = ({ reelId, onSent }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Call your MERN API here
    await fetch(`/api/v1/reels/${reelId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    setText('');
    onSent(); // Refresh the list
  };

  return (
    <form className="comment-input-area" onSubmit={handleSubmit}>
      <input 
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment for the chef..."
      />
      <button type="submit" disabled={!text.trim()}>Post</button>
    </form>
  );
};

export default CommentInput;

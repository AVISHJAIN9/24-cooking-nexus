import React, { useState } from 'react';

const MetadataForm = ({ onSubmit }) => {
  const [data, setData] = useState({ title: '', tags: '', ingredients: '' });

  const isInvalid = !data.title.trim() || !data.ingredients.trim();

  return (
    <div className="metadata-form">
      <h3 className="form-title">Recipe Details</h3>
      <input 
        className="form-input"
        placeholder="Recipe Title (e.g. 5-Min Spicy Pasta)" 
        onChange={e => setData({...data, title: e.target.value})}
      />
      <textarea 
        className="form-textarea"
        placeholder="Ingredients (separate with commas)" 
        onChange={e => setData({...data, ingredients: e.target.value})}
      />
      <input 
        className="form-input"
        placeholder="Tags (e.g. vegan, quick, italian)" 
        onChange={e => setData({...data, tags: e.target.value})}
      />
      <button 
        className="publish-btn" 
        disabled={isInvalid}
        onClick={() => onSubmit(data)}
      >
        Publish Reel
      </button>
    </div>
  );
};

export default MetadataForm;

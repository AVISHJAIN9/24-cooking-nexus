import React from 'react';

const TabSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-switcher">
      <button 
        className={activeTab === 'posts' ? 'active' : ''} 
        onClick={() => setActiveTab('posts')}
      >
        <i className="fas fa-th"></i> <span>My Recipes</span>
      </button>
      <button 
        className={activeTab === 'saved' ? 'active' : ''} 
        onClick={() => setActiveTab('saved')}
      >
        <i className="fas fa-bookmark"></i> <span>Saved</span>
      </button>
    </div>
  );
};

export default TabSwitcher;

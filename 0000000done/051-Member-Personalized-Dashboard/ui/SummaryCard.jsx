import React from 'react';

const SummaryCard = ({ title, value }) => (
  <div className="summary-card">
    <div className="summary-title">{title}</div>
    <div className="summary-value">{value}</div>
  </div>
);

export default SummaryCard;

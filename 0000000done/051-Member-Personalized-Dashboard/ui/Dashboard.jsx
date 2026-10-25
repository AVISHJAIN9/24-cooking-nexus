import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';

const Dashboard = ({ userId, apiClient = fetch }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient(`/api/v1/dashboard/${userId}`);
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Dashboard load error', err);
      }
    };
    if (userId) load();
  }, [userId]);

  if (!data) return <div>Loading dashboard...</div>;

  return (
    <div className="member-dashboard-root">
      <div className="profile-area">
        <img src={data.profile.avatar || '/assets/default-avatar.png'} alt="avatar" className="avatar" />
        <h2>{data.profile.name || data.profile.id}</h2>
        <p className="bio">{data.profile.bio}</p>
      </div>

      <div className="summary-grid">
        <SummaryCard title="Recipes" value={data.stats.recipeCount} />
        <SummaryCard title="Saved" value={data.stats.savedCount} />
        <SummaryCard title="Last Login" value={data.stats.lastLogin ? new Date(data.stats.lastLogin).toLocaleString() : '—'} />
      </div>

      <section>
        <h3>Recommended for you</h3>
        <ul>
          {data.recommended.map(r => <li key={r.id}>{r.title}</li>)}
        </ul>
      </section>

      <section>
        <h3>Recent activity</h3>
        <ul>
          {data.recent.map(r => (
            <li key={r.id}>{r.title} <span className="muted">{new Date(r.createdAt).toLocaleDateString()}</span></li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;

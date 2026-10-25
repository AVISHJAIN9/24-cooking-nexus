import React, { useState } from 'react';

const TwoFactorSetup = () => {
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');

  const handleSetup = async () => {
    const res = await fetch('/api/auth/2fa/setup');
    const data = await res.json();
    setQrCode(data.qrCodeUrl);
  };

  const handleVerify = async () => {
    const res = await fetch('/api/auth/2fa/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    if(res.ok) alert("Security Enabled!");
  };

  return (
    <div className="auth-2fa-card">
      <h3>Two-Factor Authentication</h3>
      <button onClick={handleSetup}>Get QR Code</button>
      {qrCode && <div className="qr-box"><img src={qrCode} alt="QR" /></div>}
      <input type="text" placeholder="6-digit code" onChange={(e) => setToken(e.target.value)} />
      <button onClick={handleVerify}>Verify & Enable</button>
    </div>
  );
};

export default TwoFactorSetup;

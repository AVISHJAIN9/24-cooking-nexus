const QRCode = require('qrcode');
exports.generateQR = async (text) => {
  try { return await QRCode.toDataURL(text); }
  catch (err) { console.error("QR Error", err); }
};

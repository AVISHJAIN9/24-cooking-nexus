/**
 * Triggers the browser's native share sheet.
 * Supported on most mobile browsers and Safari Desktop.
 */
export const handleNativeShare = async (title, url) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: 'Look at this amazing recipe I found on ChefReels!',
        url: url,
      });
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        console.error('        co fallback for very old browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert("Link copied!");
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }
};

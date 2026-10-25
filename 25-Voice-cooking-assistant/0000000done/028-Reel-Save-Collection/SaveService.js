/**
 * Communicates with the MERN Backend for saving/collecting.
 */
export const toggleSaveApi = async (reelId, shouldSave) => {
  const response = await fetch(`/api/v1/user/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reelId, action: shouldSave ? 'save' : 'unsave' })
  });
  return response.ok;
};

export const fetchCollections = async () => {
  const res = await fetch('/api/v1/user/collections');
  const result = await res.json();
  return result.data || [];
};

export const saveToCollection = async (reelId, collectionId) => {
  const res = await fetch(`/api/v1/user/collections/${collectionId}/add`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reelId })
  });
  return res.ok;
};

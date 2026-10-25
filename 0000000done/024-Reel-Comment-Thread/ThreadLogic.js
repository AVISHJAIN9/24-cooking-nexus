/**
 * Recursively builds a comment tree from flat data.
 */
export const buildTree = (flatComments) => {
  const map = {};
  const roots = [];

  flatComments.forEach(comment => {
    map[comment._id] = { ...comment, replies: [] };
  });

  flatComments.forEach(comment => {
    if (comment.parentId) {
      if (map[comment.parentId]) {
        map[comment.parentId].replies.push(map[comment._id]);
      }
    } else {
      roots.push(map[comment._id]);
    }
  });

  return roots;
};

export const fetchComments = async (reelId) => {
  try {
    const res = await fetch(`/api/v1/reels/${reelId}/comments`);
    const result = await res.json();
    return buildTree(result.data || []);
  } catch (err) {
    console.error("Comment Fetch Error:", err);
    return [];
  }
};

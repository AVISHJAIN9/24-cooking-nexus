// Lightweight in-memory repo with optional persistence hooks.
// Swap this for a Mongoose repo if you prefer DB-backed storage.

const timers = new Map();

module.exports = {
  async save(timer) {
    timers.set(timer.id, timer);
    return timer;
  },

  async find(id) {
    return timers.get(id) || null;
  },

  async update(id, data) {
    if (!timers.has(id)) return null;
    timers.set(id, Object.assign({}, timers.get(id), data));
    return timers.get(id);
  },

  async findByUser(userId) {
    const out = [];
    for (const t of timers.values()) if (t.userId === userId) out.push(t);
    return out;
  },

  async clearAll() {
    timers.clear();
  }
};

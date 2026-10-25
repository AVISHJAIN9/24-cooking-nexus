// Simple Timer Engine for Kitchen operations
const Repo = require('../data/timer.repo');

class TimerEngine {
  static async createTimer({ label = 'Kitchen', durationMs = 300000, userId = 'guest' } = {}) {
    const timer = {
      id: `timer-${Date.now()}`,
      label,
      durationMs,
      remainingMs: durationMs,
      status: 'RUNNING',
      createdAt: new Date(),
      userId
    };

    await Repo.save(timer);
    return timer;
  }

  static async stopTimer(id) {
    const t = await Repo.find(id);
    if (!t) return null;
    t.status = 'STOPPED';
    t.remainingMs = 0;
    await Repo.update(id, t);
    return t;
  }

  static async getTimer(id) {
    return await Repo.find(id);
  }

  static async listTimersForUser(userId) {
    return await Repo.findByUser(userId);
  }
}

module.exports = TimerEngine;

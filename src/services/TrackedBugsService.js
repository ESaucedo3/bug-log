import { dbContext } from "../db/DbContext.js";

class TrackedBugsService {


  async createTrackedBug(tBugData) {
    const tBug = await dbContext.TrackedBug.create(tBugData);
    await tBug.populate('tracker');
    await tBug.populate('bug');
    return tBug;
  }

  async getTrackersByBugId(bugId) {
    const tBug = await dbContext.TrackedBug.find({ bugId: bugId }).populate('tracker');
    return tBug;
  }
}

export const trackedBugsService = new TrackedBugsService();
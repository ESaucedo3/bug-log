import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class TrackedBugsService {
  async deleteTrackedBug(trackedBugId, userId) {
    const bugToDelete = await dbContext.TrackedBug.findById(trackedBugId);
    if (bugToDelete.accountId != userId) {
      throw new Forbidden("No");
    }

    await bugToDelete.deleteOne();
    return 'All gone'
  }

  async getBugsUserIsTracking(userId) {
    const bugs = await dbContext.TrackedBug.find({ accountId: userId }).populate('bug');
    return bugs;
  }


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
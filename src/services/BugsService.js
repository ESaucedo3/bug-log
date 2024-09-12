import { dbContext } from "../db/DbContext.js";

class BugsService {

  async getAllBugs() {
    const bugs = await dbContext.Bug.find().populate('creator');
    return bugs;
  }

  async updateBug(updateData, bugId, userId) {
    const bugToUpdate = await dbContext.Bug.findById(bugId)

  }

  async createBug(bugData, userId) {
    bugData.creatorId = userId
    const bug = await dbContext.Bug.create(bugData);
    await bug.populate('creator')
    return bug;
  }
}

export const bugsService = new BugsService();
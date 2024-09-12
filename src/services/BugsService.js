import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";

class BugsService {
  async deleteBug(bugId, userId) {
    const bugToDelete = await dbContext.Bug.findById(bugId);
    if (bugToDelete.creatorId != userId) {
      throw new Forbidden('You cannot delete this bug')
    }
  }

  async getAllBugs() {
    const bugs = await dbContext.Bug.find().populate('creator');
    return bugs;
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bug.findById(bugId).populate('creator');
    return bug;
  }

  async updateBug(updateData, bugId, userId) {
    const bugToUpdate = await dbContext.Bug.findById(bugId)

    if (updateData.creatorId != userId) {
      throw new Forbidden(`you can't access another persons Bug`)
    }
    // bugToUpdate.title = updateData. title ?? bugToUpdate.title
    // bugToUpdate.description = updateData.description ?? bugToUpdate.description
    bugToUpdate.priority = updateData.priority ?? bugToUpdate.priority
    bugToUpdate.closed = updateData.closed ?? bugToUpdate.closed
    if (bugToUpdate.closed == true) {
      bugToUpdate.closedDate = new Date()
    }
    await bugToUpdate.save()
    return bugToUpdate
  }

  async createBug(bugData, userId) {
    bugData.creatorId = userId
    const bug = await dbContext.Bug.create(bugData);
    await bug.populate('creator')
    return bug;
  }
}

export const bugsService = new BugsService();
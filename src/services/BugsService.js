import { dbContext } from "../db/DbContext.js";
import { Forbidden, NotFound } from "../utils/Errors.js";

class BugsService {

  async getAllBugs() {
    const bugs = await dbContext.Bug.find().populate('creator', '-email -subs');
    return bugs;
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bug.findById(bugId).populate('creator', '-email -subs');

    if (bug == null) {
      throw new NotFound('ID Not Found')
    }


    return bug;
  }

  async updateBug(updateData, bugId, userId) {
    // const bugToUpdate = await dbContext.Bug.findById(bugId)
    const bugToUpdate = await this.getBugById(bugId)

    if (bugToUpdate.creatorId != userId) {
      throw new Forbidden(`You can't access another persons Bug`)
    }

    bugToUpdate.title = updateData.title ?? bugToUpdate.title
    bugToUpdate.description = updateData.description ?? bugToUpdate.description
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
    await bug.populate('creator', '-email -subs')
    return bug;
  }

  async deleteBug(bugId, userId) {
    const bugToDelete = await this.getBugById(bugId)


    if (bugToDelete.creatorId != userId) {
      throw new Forbidden(`You can't access another persons Bug`)
    }

    await bugToDelete.deleteOne();
    return `${bugToDelete} was deleted`
  }
}

export const bugsService = new BugsService();
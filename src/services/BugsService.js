import { dbContext } from "../db/DbContext.js";
import { Forbidden, NotFound } from "../utils/Errors.js";

class BugsService {
  async createBug(bugData) {
    const bugToCreate = await dbContext.Bugs.create(bugData);
    await bugToCreate.populate("creator", "-email -subs");
    return bugToCreate;
  }
  async getAllBugs() {
    const bugs = await dbContext.Bugs.find().populate(
      "creator",
      "-email -subs"
    );
    return bugs;
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate(
      "creator",
      "-email -subs"
    );

    if (!bug) {
      throw new NotFound("ID Not Found");
    }

    return bug;
  }

  async updateBug(bugId, bugData) {
    const bugToUpdate = await this.getBugById(bugId);

    if (bugToUpdate.creatorId != bugData.creatorId) {
      throw new Forbidden(`You can't access another persons Bug`);
    }

    bugToUpdate.title = bugData.title ?? bugToUpdate.title;
    bugToUpdate.description = bugData.description ?? bugToUpdate.description;
    bugToUpdate.priority = bugData.priority ?? bugToUpdate.priority;
    bugToUpdate.closed = bugData.closed ?? bugToUpdate.closed;
    if (bugToUpdate.closed === true) {
      bugToUpdate.closedDate = new Date();
    }
    await bugToUpdate.save();
    return bugToUpdate;
  }

  async deleteBug(bugId, userId) {
    const bugToDelete = await this.getBugById(bugId);

    if (bugToDelete.creatorId != userId) {
      throw new Forbidden(`You can't access another persons Bug`);
    }

    await bugToDelete.deleteOne();
    return `${bugToDelete.title} was deleted`;
  }
}

export const bugsService = new BugsService();

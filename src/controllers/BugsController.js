import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugsService } from "../services/BugsService.js";
import { notesService } from "../services/NotesService.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .get('/:bugId/notes', this.getNotesByBugId)
      .get('/:bugId/trackedbugs', this.getTrackersByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.updateBug)
      .delete('/:bugId', this.deleteBug)
  }

  async getNotesByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId;
      const notes = await notesService.getNotesByBugId(bugId);
      response.send(notes)
    } catch (e) {
      next(e)
    }
  }

  async getAllBugs(request, response, next) {
    try {
      const bugs = await bugsService.getAllBugs();
      response.send(bugs);
    } catch (error) {
      next(error);
    }
  }

  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bug = await bugsService.getBugById(bugId);
      response.send(bug)
    } catch (error) {
      next(error);
    }
  }

  async getTrackersByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId;
      const trackers = await trackedBugsService.getTrackersByBugId(bugId);
      response.send(trackers);
    } catch (e) {
      next(e)
    }
  }

  async createBug(request, response, next) {
    try {
      const bugData = request.body;
      const user = request.userInfo
      const createdBug = await bugsService.createBug(bugData, user.id);
      response.send(createdBug)
    } catch (e) {
      next(e)
    }
  }

  async updateBug(request, response, next) {
    try {
      const updateData = request.body
      const bugId = request.params.bugId
      const user = request.userInfo
      const bugToUpdate = await bugsService.updateBug(updateData, bugId, user.id)
      response.send(bugToUpdate)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId;
      const user = request.userInfo
      const deletedBugMessage = await bugsService.deleteBug(bugId, user.id);
      response.send(deletedBugMessage)
    } catch (error) {
      next(error);
    }
  }
}
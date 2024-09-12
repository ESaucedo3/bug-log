import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugsService } from "../services/BugsService.js";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.updateBug)
      .delete('/:bugId', this.deleteBug)
  }
  async updateBug(request, response, next) {
    try {
      const updateData = response.body
      const bugId = response.params.bugId
      const user = response.userinfo
      const bugToUpdate = await bugsService.updateBug(updateData, bugId, user.id)
      response.send(bugToUpdate)
    } catch (error) {
      next(error)
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

    } catch (error) {
      next(error);
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

  async deleteBug(request, response, next) {
    try {

    } catch (error) {
      next(error);
    }
  }
}
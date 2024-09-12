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
    } catch (error) {
      next(error)
    }
  }

  async getAllBugs(request, response, next) {

  }

  async getBugById(request, response, next) {

  }

  async createBug(request, response, next) {
    try {
      const bugData = request.body;
      //const createdBug = await bugsService.createBug(bugData);
    } catch (e) {
      next(e)
    }
  }

  async deleteBug(request, response, next) {

  }
}
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class TrackedBugsController extends BaseController {
  constructor() {
    super(`api/trackedBugs`)
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('', this.)
      .post('', this.createTrackedBug)
      .delete('/:trackedBugId', this.deleteTrackedBug)
  }

  async createTrackedBug(request, response, next) {
    try {
      const tBugData = request.body;
      const user = request.userInfo;
      tBugData.accountId = user.id;
      const tBug = await trackedBugsService.createTrackedBug(tBugData);
      response.send(tBug)
    } catch (error) {
      next(error);
    }
  }

  async deleteTrackedBug(request, response, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

}
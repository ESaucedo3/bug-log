import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {
  constructor() {
    super('api/notes');
    this.router
      .get('/:bugId/notes', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
  }

  async getNotesByBugId(request, response, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async createNote(request, response, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  async deleteNote(request, response, next) {
    try {

    } catch (error) {
      next(error);
    }
  }
}
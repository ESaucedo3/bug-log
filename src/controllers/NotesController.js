import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class NotesController extends BaseController {
  constructor() {
    super('api/notes');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
  }

  async createNote(request, response, next) {
    try {
      const noteData = request.body;
      const user = request.userInfo;
      const createdNote = await notesService.createdNote(user.id, noteData)
      response.send(createdNote)
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(request, response, next) {
    try {
      const noteId = request.params.noteId
      const user = request.userInfo
      const noteMessage = await notesService.deleteNote(noteId, user.id)
      response.send(noteMessage)
    } catch (error) {
      next(error);
    }
  }

}
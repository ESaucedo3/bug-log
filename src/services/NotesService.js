import { dbContext } from "../db/DbContext.js";
import { Forbidden, NotFound } from "../utils/Errors.js";

class NotesService {
  async deleteNote(noteId, userId) {
    const noteToDelete = await dbContext.Note.findById(noteId)
    if (noteToDelete == null) {
      throw new NotFound(`No note found at this Id`)
    }
    if (noteToDelete.creatorId != userId) {
      throw new Forbidden(`cannot access another users Note`)
    }
    await noteToDelete.deleteOne()
    return `Note has been deleted ${noteToDelete}`
  }
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Note.find({ bugId: bugId })

    return notes;
  }
  async createdNote(userId, noteData) {
    noteData.creatorId = userId
    const newNote = await dbContext.Note.create(noteData);
    await newNote.populate('creator', '-subs -email')
    return newNote;
  }

}

export const notesService = new NotesService();
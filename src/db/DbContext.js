import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { BugSchema } from "../models/Bug.js";
import { TrackedBugSchema } from "../models/TrackedBug.js";
import { NoteSchema } from "../models/Note.js";

class DbContext {
  Account = mongoose.model("Account", AccountSchema);
  Bugs = mongoose.model("Bug", BugSchema);
  TrackedBugs = mongoose.model("TrackedBug", TrackedBugSchema);
  Notes = mongoose.model("Note", NoteSchema);
}

export const dbContext = new DbContext();

import { Schema } from "mongoose";

export const TrackedBugSchema = new Schema(
  {
    accountId: { type: Schema.ObjectId, required: true, ref: "Account" },
    bugId: { type: Schema.ObjectId, required: true, ref: "Bug" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

TrackedBugSchema.virtual("tracker", {
  localField: "accountId",
  ref: "Accoun",
  foreignField: "_id",
});

TrackedBugSchema.virtual(`bug`, {
  localField: "bugId",
  foreignField: "_id",
  ref: "Bug",
  justOne: true,
});

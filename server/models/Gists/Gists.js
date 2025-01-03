import mongoose from "mongoose";

const gistSchema = new mongoose.Schema(
  {
    gistName: {
      type: String,
    },
    gistDescription: {
      type: String,
    },
    fileName: {
      type: String,
    },
    fileContent: {
      type: String,
    },
    type: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const gistModel = mongoose.model("gists", gistSchema, "gists");
export default gistModel;

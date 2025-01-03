import mongoose from "mongoose";

const reposSchema = new mongoose.Schema(
  {
    repoName: {
      type: String,
    },
    description: {
      type: String,
    },
    keywords: {
      type: String,
    },
    type: {
      type: String,
    },
    branch: {
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
const reposModel = mongoose.model("Repos", reposSchema, "Repos");
export default reposModel;

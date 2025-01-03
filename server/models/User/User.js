import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_type: {
      type: String,
    },
    user_view_type: {
      type: String,
    },
    site_admin: {
      type: Boolean,
    },
    fullName: {
      type: String,
      require: true,
    },
    company: {
      type: String,
    },
    blog: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    hireable: {
      type: String,
    },
    bio: {
      type: String,
    },
    twitter_username: {
      type: String,
    },
    public_repos: {
      type: Number,
    },
    public_gists: {
      type: Number,
    },
    followers: {
      type: Number,
    },
    following: {
      type: Number,
    },
    userVerified: {
      email: {
        type: String,
        default: false,
      },
      phone: {
        type: String,
        default: false,
      },
    },
    userVerifyToken: {
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("Users", userSchema, "Users");
export default userModel;

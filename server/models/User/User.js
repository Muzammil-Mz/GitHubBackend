import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_type: {
      type: String,
      require:true
    },
    user_view_type: {
      type: String,
      require:true
    },
    site_admin: {
      type: Boolean,
      require:true
    },
    fullName: {
      type: String,
      require: true,
      require:true
    },
    company: {
      type: String,
      require:true
    },
    blog: {
      type: String,
      require:true
    },
    location: {
      type: String,
      require:true
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
      require:true
    },
    bio: {
      type: String,
      require:true
    },
    twitter_username: {
      type: String,
      require:true
    },
    public_repos: {
      type: Number,
      require:true
    },
    public_gists: {
      type: Number,
      require:true
    },
    followers: {
      type: Number,
      require:true
    },
    following: {
      type: Number,
      require:true
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

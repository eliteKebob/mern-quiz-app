import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("User", userSchema)

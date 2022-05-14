import mongoose from "mongoose"

const quizSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer1: {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
    answer2: {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
    answer3: {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
    answer4: {
      text: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
    photo: {
      type: String,
      default:
        "https://media.istockphoto.com/photos/and-a-concept-yellow-question-mark-glowing-amid-black-question-marks-picture-id1305169776?b=1&k=20&m=1305169776&s=170667a&w=0&h=mpYdh2MzGN_rqxoRNlO5KWGCCq3ZktzSfp-wA0nD9no=",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Quiz", quizSchema)

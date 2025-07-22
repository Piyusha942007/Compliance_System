// models/User.js
// import mongoose from "mongoose";

// // User.js

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: String,
//   compliance: [
//     {
//       subject: String,
//       status: {
//         Assignment: { type: String, default: 'Pending' },
//         Manual: { type: String, default: 'Pending' },
//         PrelimExam: { type: String, default: 'Pending' },
//         MCQQuiz: { type: String, default: 'Pending' },
//         CourseEndSurvey: { type: String, default: 'Pending' }
//       },
//       teacherSignature: String
//     }
//   ]
// });

// const User = mongoose.model("User", userSchema);
// export default User;


// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  compliance: [
    {
      subject: String,
      status: {
        assignment: { type: String, default: 'Pending' },
        manual: { type: String, default: 'Pending' },
        prelim_exam: { type: String, default: 'Pending' },
        mcq_quiz: { type: String, default: 'Pending' },
        course_end_survey: { type: String, default: 'Pending' }
      },
      teacherSignature: String
    }
  ]
});

const User = mongoose.model("User", userSchema);
export default User;

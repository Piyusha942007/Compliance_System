// import mongoose from 'mongoose';

// const complianceSchema = new mongoose.Schema({
//   studentEmail: String,
//   subject: String,
//   status: {
//     Assignment: { type: String, default: "Pending" },
//     Manual: { type: String, default: "Pending" },
//     PrelimExam: { type: String, default: "Pending" },
//     MCQQuiz: { type: String, default: "Pending" },
//     CourseEndSurvey: { type: String, default: "Pending" },
//   }
// });

// export default mongoose.model('Compliance', complianceSchema);
import mongoose from 'mongoose';

const complianceSchema = new mongoose.Schema({
  studentEmail: String,
  subject: String,
  status: {
    assignment: { type: String, default: "Pending" },
    manual: { type: String, default: "Pending" },
    prelim_exam: { type: String, default: "Pending" },
    mcq_quiz: { type: String, default: "Pending" },
    course_end_survey: { type: String, default: "Pending" },
  }
});

export default mongoose.model('Compliance', complianceSchema);

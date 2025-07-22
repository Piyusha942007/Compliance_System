import mongoose from 'mongoose';

const ComplianceSchema = new mongoose.Schema({
  subject: String,
  assignment: { type: String, default: "Pending" },
  manual: { type: String, default: "Pending" },
  prelim: { type: String, default: "Pending" },
  quiz: { type: String, default: "Pending" },
  survey: { type: String, default: "Pending" },
  teacherSignature: { type: String, default: "" }
});

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  roll: String,
  compliance: [ComplianceSchema]
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;



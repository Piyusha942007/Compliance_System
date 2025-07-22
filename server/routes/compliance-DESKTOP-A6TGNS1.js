// routes/compliance.js
// import express from 'express';
// import User from '../models/User.js';

// const router = express.Router();

// // ✅ Get all students (filtered by role)
// router.get('/students', async (req, res) => {
//   try {
//     const students = await User.find({ role: 'student' }, 'name email roll');
//     res.json(students);
//   } catch (error) {
//     console.error("Failed to fetch students:", error);
//     res.status(500).json({ error: 'Failed to fetch students' });
//   }
// });

// // ✅ Update compliance status for a student (update all 5 fields + signature)
// router.post('/update', async (req, res) => {
//   const { studentEmail, subject, status, teacherSignature } = req.body;

//   if (!studentEmail || !subject || !status) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const student = await User.findOne({ email: studentEmail, role: 'student' });
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     if (!student.compliance) student.compliance = [];

//     const index = student.compliance.findIndex(c => c.subject === subject);

//     if (index !== -1) {
//       // Update existing subject compliance
//       student.compliance[index].status.assignment = status.assignment || "Pending";
//       student.compliance[index].status.manual = status.manual || "Pending";
//       student.compliance[index].status.prelimExam = status.prelimExam || "Pending";
//       student.compliance[index].status.mcqQuiz = status.mcqQuiz || "Pending";
//       student.compliance[index].status.courseEndSurvey = status.courseEndSurvey || "Pending";
//       student.compliance[index].teacherSignature = teacherSignature || "";
//     } else {
//       // Add new subject compliance
//       student.compliance.push({
//         subject,
//         status: {
//           assignment: status.assignment || "Pending",
//           manual: status.manual || "Pending",
//           prelimExam: status.prelimExam || "Pending",
//           mcqQuiz: status.mcqQuiz || "Pending",
//           courseEndSurvey: status.courseEndSurvey || "Pending"
//         },
//         teacherSignature: teacherSignature || ""
//       });
//     }

//     await student.save();
//     res.json({ message: "Compliance updated successfully", compliance: student.compliance });

//   } catch (err) {
//     console.error("❌ Backend Error:", err);
//     res.status(500).json({ message: "Failed to update compliance" });
//   }
// });

// // ✅ Get compliance for a specific student and subject
// router.get('/student/:email/:subject', async (req, res) => {
//   const { email, subject } = req.params;

//   try {
//     const student = await User.findOne({ email, role: 'student' });
//     if (!student || !student.compliance) return res.json({});

//     const subjectCompliance = student.compliance.find(c => c.subject === subject);
//     res.json(subjectCompliance || {});
//   } catch (err) {
//     console.error("Failed to fetch student compliance:", err);
//     res.status(500).json({ message: "Failed to fetch student compliance" });
//   }
// });

// export default router;
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// ✅ Get all students (filtered by role)
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }, 'name email roll');
    res.json(students);
  } catch (error) {
    console.error("Failed to fetch students:", error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// ✅ Update compliance status for a student (update all 5 fields + signature)
router.post('/update', async (req, res) => {
  const { studentEmail, subject, status, teacherSignature } = req.body;

  if (!studentEmail || !subject || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const student = await User.findOne({ email: studentEmail, role: 'student' });
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (!student.compliance) student.compliance = [];

    const defaultStatus = {
      assignment: "Pending",
      manual: "Pending",
      prelimExam: "Pending",
      mcqQuiz: "Pending",
      courseEndSurvey: "Pending",
    };

    const updatedStatus = { ...defaultStatus, ...status };

    const index = student.compliance.findIndex(c => c.subject === subject);

    if (index !== -1) {
      // Update existing subject compliance
      student.compliance[index].status = updatedStatus;
      student.compliance[index].teacherSignature = teacherSignature || "";
    } else {
      // Add new subject compliance
      student.compliance.push({
        subject,
        status: updatedStatus,
        teacherSignature: teacherSignature || ""
      });
    }

    await student.save();
    res.json({ message: "Compliance updated successfully", compliance: student.compliance });
  } catch (err) {
    console.error("❌ Backend Error:", err);
    res.status(500).json({ message: "Failed to update compliance" });
  }
});

// ✅ Get compliance for a specific student and subject
router.get('/student/:email/:subject', async (req, res) => {
  const { email, subject } = req.params;

  try {
    const student = await User.findOne({ email, role: 'student' });
    if (!student || !student.compliance) return res.json({});

    const subjectCompliance = student.compliance.find(c => c.subject === subject);
    res.json(subjectCompliance || {});
  } catch (err) {
    console.error("Failed to fetch student compliance:", err);
    res.status(500).json({ message: "Failed to fetch student compliance" });
  }
});

export default router;
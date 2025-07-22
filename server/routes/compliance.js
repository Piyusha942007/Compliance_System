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

// // ✅ Update compliance status for a student (by teacher)
// router.post('/update', async (req, res) => {
//   console.log("📩 Data received by backend:", req.body);

//   const { studentEmail, subject, status, teacherSignature } = req.body;

//   console.log("🛠️ Backend received:", req.body);

//   if (!studentEmail || !subject || !status) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const student = await User.findOne({ email: studentEmail, role: 'student' });
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     if (!student.compliance) student.compliance = [];

//     const index = student.compliance.findIndex(c => c.subject === subject);

//     if (index !== -1) {
//       // Update existing compliance
//       student.compliance[index].status = {
//         ...student.compliance[index].status,
//         ...status
//       };
//       if (teacherSignature) student.compliance[index].teacherSignature = teacherSignature;
//     } else {
//       // Create new entry
//       student.compliance.push({
//         subject,
//         status,
//         teacherSignature: teacherSignature || ''
//       });
//     }

//     await student.save();
//     res.json({ message: "Compliance updated successfully", compliance: student.compliance });

//   } catch (err) {
//     console.error("❌ Backend Error:", err);
//     res.status(500).json({ message: "Failed to update compliance" });
//   }
// });// Assuming you're using Express and Mongoose
// // POST /api/compliance/update
// router.post("/update", async (req, res) => {
//   const { studentEmail, subject, status, teacherSignature } = req.body;

//   try {
//     const student = await Student.findOne({ email: studentEmail });

//     if (!student) return res.status(404).json({ message: "Student not found" });

//     // Find index of subject in compliance array
//     const index = student.compliance.findIndex(entry => entry.subject === subject);

//     if (index !== -1) {
//       // Update existing subject entry
//       student.compliance[index].assignment = status.assignment;
//       student.compliance[index].manual = status.manual;
//       student.compliance[index].prelim_exam = status.prelim_exam;
//       student.compliance[index].mcq_quiz = status.mcq_quiz;
//       student.compliance[index].course_end_survey = status.course_end_survey;
//       student.compliance[index].teacherSignature = teacherSignature;
//     } else {
//       // Add new entry if not found
//       student.compliance.push({
//         subject,
//         assignment: status.assignment,
//         manual: status.manual,
//         prelim_exam: status.prelim_exam,
//         mcq_quiz: status.mcq_quiz,
//         course_end_survey: status.course_end_survey,
//         teacherSignature,
//       });
//     }

//     await student.save();

//     res.json({ message: "Compliance updated successfully" });
//   } catch (err) {
//     console.error("Error updating compliance:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // ✅ Get compliance for a specific student and subject (for student dashboard)
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

// // ✅ Get compliance data for a student
// // ✅ Get compliance data for a student
// router.get("/student/:email", async (req, res) => {
//   const email = req.params.email;

//   try {
//     const complianceList = await Compliance.find({ email });
//     console.log("📦 Sending compliance list for:", email, complianceList);

//     if (complianceList.length === 0) {
//       return res.status(404).json({ message: "No compliance data found" });
//     }

//     res.status(200).json(complianceList);
//   } catch (error) {
//     console.error("❌ Error fetching student compliance:", error);
//     res.status(500).json({ message: "Error fetching data" });
//   }
// });

 
// // routes/compliance.js (or your controller file)

// router.post("/save", async (req, res) => {
//   const { email, subject, assignment, manual, prelimExam, mcqQuiz, courseEndSurvey, signature } = req.body;

//   try {
//     const updated = await Compliance.findOneAndUpdate(
//       { email, subject }, // find this student's compliance for the subject
//       {
//         $set: {
//           assignment,
//           manual,
//           prelimExam,
//           mcqQuiz,
//           courseEndSurvey,
//           signature
//         }
//       },
//       { new: true, upsert: true } // create if not exists
//     );

//     console.log("✅ Compliance updated:", updated);
//     res.status(200).json({ message: "Compliance updated successfully", updated });
//   } catch (error) {
//     console.error("❌ Error saving compliance:", error);
//     res.status(500).json({ message: "Error saving compliance" });
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

// ✅ Update compliance status for a student (by teacher)
router.post('/update', async (req, res) => {
  console.log("📩 Data received by backend:", req.body);

  const { studentEmail, subject, status, teacherSignature } = req.body;

  console.log("🛠️ Backend received:", req.body);

  if (!studentEmail || !subject || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const student = await User.findOne({ email: studentEmail, role: 'student' });
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (!student.compliance) student.compliance = [];

    const index = student.compliance.findIndex(c => c.subject === subject);

    if (index !== -1) {
      // Update existing compliance
      student.compliance[index].status = {
        ...student.compliance[index].status,
        ...status
      };
      if (teacherSignature) student.compliance[index].teacherSignature = teacherSignature;
    } else {
      // Create new entry
      student.compliance.push({
        subject,
        status,
        teacherSignature: teacherSignature || ''
      });
    }

    await student.save();
    res.json({ message: "Compliance updated successfully", compliance: student.compliance });

  } catch (err) {
    console.error("❌ Backend Error:", err);
    res.status(500).json({ message: "Failed to update compliance" });
  }
});

// ✅ Get compliance for a specific student and subject (for student dashboard)
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

// ✅ Get compliance data for a student
router.get("/student/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const student = await User.findOne({ email, role: 'student' });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log("📦 Sending student data:", student);
    res.status(200).json(student);
  } catch (error) {
    console.error("❌ Error fetching student compliance:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

 
export default router;

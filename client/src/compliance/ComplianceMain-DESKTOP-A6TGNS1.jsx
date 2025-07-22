import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const subjects = [
  'Engineering Mathematics II',
  'Environmental Science',
  'Basic Electronics Engineering',
  'Engineering Graphics',
  'Engineering Mechanics',
  'Applied Physics & Chemistry',
  'Workshop Practice',
  'Basic Electrical Engineering',
];

const columns = [
  'Assignment',
  'Manual',
  'Prelim Exam',
  'MCQ Quiz',
  'Course End Survey',
];

const columnKeyMap = {
  Assignment: "assignment",
  Manual: "manual",
  "Prelim Exam": "prelim_exam",
  "MCQ Quiz": "mcq_quiz",
  "Course End Survey": "course_end_survey"
};

// ------------------- Teacher Dashboard ----------------------
export function TeacherDashboard() {
  const { subject } = useParams();
  const decodedSubject = decodeURIComponent(subject);
  const [students, setStudents] = useState([]);
  const [signatures, setSignatures] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/compliance/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };

  const handleStatusChange = (index, column, value) => {
    const updatedStudents = [...students];
    const student = updatedStudents[index];
    let subjectCompliance = student.compliance?.find(c => c.subject === decodedSubject);
    if (!subjectCompliance) {
      subjectCompliance = { subject: decodedSubject, status: {} };
      if (!student.compliance) student.compliance = [];
      student.compliance.push(subjectCompliance);
    }
    subjectCompliance.status[column] = value;

    if (!student.complianceUpdates) student.complianceUpdates = {};
    student.complianceUpdates[column] = value;

    setStudents(updatedStudents);
  };

  const handleSigUpload = (e, studentEmail) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSignatures(prev => ({
        ...prev,
        [studentEmail]: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (student) => {
    const sig = signatures[student.email];
    if (!sig) return alert("Please upload your signature first.");
    if (!student.complianceUpdates) return alert("No changes to save for this student.");

    const transformedStatus = {};
    for (const col in student.complianceUpdates) {
      const key = columnKeyMap[col];
      transformedStatus[key] = student.complianceUpdates[col];
    }

    setSaving(true);
    try {
      await axios.post("http://localhost:5000/api/compliance/update", {
        studentEmail: student.email,
        subject: decodedSubject,
        status: transformedStatus,
        teacherSignature: sig
      });
      alert(`Saved compliance for ${student.name}`);
      fetchStudents(); // Refresh data after saving
    } catch (err) {
      console.error("Error saving compliance:", err);
      alert("Error saving data");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fullCenterColumn">
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <h2>{decodedSubject} - Compliance Dashboard</h2>
        <table className="compTable">
          <thead>
            <tr>
              <th>Student Name</th>
              {columns.map(col => <th key={col}>{col}</th>)}
              <th>Signature</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => {
              const subjectData = student.compliance?.find(c => c.subject === decodedSubject);
              return (
                <tr key={student.email}>
                  <td>{student.name}</td>
                  {columns.map(col => {
                    const value = subjectData?.status?.[col] || "Pending";
                    return (
                      <td key={col}>
                        <select
                          value={value}
                          onChange={e => handleStatusChange(idx, col, e.target.value)}
                          disabled={value === "Done"}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Done">Done</option>
                        </select>
                      </td>
                    );
                  })}
                  <td>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSigUpload(e, student.email)}
                    />
                    {signatures[student.email] && (
                      <img
                        className="sigPreview"
                        src={signatures[student.email]}
                        alt="signature"
                        style={{ width: 60 }}
                      />
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleSave(student)} disabled={saving}>
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// ------------------- Student Dashboard (LIVE VERSION) ----------------------
export function StudentDashboard() {
  const email = "user123@gmail.com"; // Replace with actual logged-in email if available
  const name = "User123";

  const [complianceData, setComplianceData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompliance();
  }, []);

  const fetchCompliance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/compliance/student", {
        params: { email }
      });
      const data = res.data.compliance;

      // Ensure all subjects exist
      const fullData = {};
      subjects.forEach(sub => {
        fullData[sub] = data[sub] || {
          assignment: "Pending",
          manual: "Pending",
          prelim_exam: "Pending",
          mcq_quiz: "Pending",
          course_end_survey: "Pending",
          teacherSignature: ""
        };
      });

      setComplianceData(fullData);
    } catch (err) {
      console.error("Error fetching student compliance:", err);
    } finally {
      setLoading(false);
    }
  };

  const isAllDone = subjects.every(sub =>
    columns.every(col => {
      const key = columnKeyMap[col];
      return complianceData?.[sub]?.[key] === "Done";
    })
  );

  const handlePrint = () => window.print();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="fullCenterColumn">
      <h2>Compliance Report</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>

      <table className="compTable">
        <thead>
          <tr>
            <th>Subject</th>
            {columns.map(col => <th key={col}>{col}</th>)}
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(sub => (
            <tr key={sub}>
              <td>{sub}</td>
              {columns.map(col => {
                const key = columnKeyMap[col];
                const val = complianceData?.[sub]?.[key] || "Pending";
                return (
                  <td key={col} style={{ color: val === "Done" ? "green" : "red" }}>
                    {val}
                  </td>
                );
              })}
              <td>
                {complianceData?.[sub]?.teacherSignature ? (
                  <img
                    src={complianceData[sub].teacherSignature}
                    alt="Signature"
                    style={{ width: 80, border: "1px solid #aaa", borderRadius: "4px" }}
                  />
                ) : (
                  "Not Signed"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAllDone ? (
        <button onClick={handlePrint} style={{ marginTop: "20px" }}>
          🖨️ Print Report
        </button>
      ) : (
        <p style={{ marginTop: "20px", color: "red" }}>
          ⚠️ Compliance is still pending for one or more subjects.
        </p>
      )}
    </div>
  );
}




// ------------------- Subject Selector ----------------------
export function TeacherSubjectSelect() {
  return (
    <div className="fullCenter">
      <h2>Select Your Subject</h2>
      <div className="roleBtns">
        {subjects.map((subj) => (
          <Link key={subj} to={`/compliance/teacher/${encodeURIComponent(subj)}`}>
            <button>{subj}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}



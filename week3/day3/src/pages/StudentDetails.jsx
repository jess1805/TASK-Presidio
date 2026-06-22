import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function StudentDetails() {
  const { id } = useParams();

  const students =
    JSON.parse(localStorage.getItem("students")) || [];

  const student = students.find(
    (s) => s.id === Number(id)
  );

  if (!student) {
    return <h2>Student Not Found</h2>;
  }

  return (
    <div>
      <Navbar />

      <h2>Student Details</h2>

      <p>ID: {student.id}</p>
      <p>Name: {student.name}</p>
      <p>Email: {student.email}</p>
    </div>
  );
}

export default StudentDetails;
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Students() {
  const students =
    JSON.parse(localStorage.getItem("students")) || [];

  return (
    <div>
      <Navbar />

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student.id}>
          <Link to={`/students/${student.id}`}>
            {student.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Students;
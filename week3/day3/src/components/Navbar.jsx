import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/home">Home</Link> |{" "}
      <Link to="/students">Students</Link>
      <hr />
    </nav>
  );
}

export default Navbar;
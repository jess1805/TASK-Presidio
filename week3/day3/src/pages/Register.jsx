import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const saveStudent = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

const onSubmit = async (data) => {
  try {
    await saveStudent(data);

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    students.push({
      id: Date.now(),
      ...data,
    });

    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );

    navigate("/home");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...register("name")}
        />
        <p>{errors.name?.message}</p>

        <input
          placeholder="Email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
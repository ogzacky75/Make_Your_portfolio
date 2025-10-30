import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

function SignUp({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/home");
  }, [navigate]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Signup successful! Please login.");
      resetForm();
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-green-500">
      <section className="bg-gray-300 shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col space-y-4">
            <div>
              <Field type="text" name="username" placeholder="Username" className="w-full border p-2 rounded" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field type="email" name="email" placeholder="Email" className="w-full border p-2 rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field type="password" name="password" placeholder="Password" className="w-full border p-2 rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full border p-2 rounded" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-900 font-bold hover:underline">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default SignUp;

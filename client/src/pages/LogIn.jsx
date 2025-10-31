import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function LogIn({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/home");
  }, [navigate]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("https://make-your-portfolio.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthenticated(true);

      resetForm();
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Server error, please try again later.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="bg-pink-400 p-8 w-96 rounded-2xl shadow-lg pt-10 pb-20">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col space-y-4">
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="email" component="div" className="text-black-900 text-sm" />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="password" component="div" className="text-black-900 text-sm" />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-green-600 text-black py-2 rounded-3xl font-bold"
            >
              Login
            </button>
          </Form>
        </Formik>
        <p className="text-center text-sm mt-4 text-white">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-800 underline">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}

export default LogIn;

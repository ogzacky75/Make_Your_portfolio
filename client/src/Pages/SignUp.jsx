    import React, { useState } from "react";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import { Link, useNavigate } from "react-router-dom";

    const SignUpSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    });

    function SignUp() {
    const navigate = useNavigate();
    const [backendErrors, setBackendErrors] = useState({});

    const handleSubmit = async (values, { resetForm }) => {
        setBackendErrors({}); // Clear previous errors
        try {
        const response = await fetch("http://127.0.0.1:5000/users", {
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
            // If backend returns field-specific errors, set them
            setBackendErrors(data || { general: "Signup failed" });
            return;
        }

        alert("Signup successful! Please login 😊");
        resetForm();
        navigate("/login");
        } catch (error) {
        console.error("Error:", error);
        setBackendErrors({ general: "Signup failed. Try again." });
        }
    };

    return (
        <div className="signup-page">
        <header className="signup-header">
            <h2 className="logo">MYP</h2>
            <nav>
            <Link to="/login">
                <button className="login-btn">login</button>
            </Link>
            <Link to="/signup">
                <button className="signup-btn">signup</button>
            </Link>
            </nav>
        </header>

        <main>
            <section className="signup-section">
            <h3>Sign up</h3>

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
                {() => (
                <Form className="signup-form">
                    <Field type="text" name="username" placeholder="username" />
                    <ErrorMessage name="username" component="div" className="error" />
                    {backendErrors.username && (
                    <div className="error">{backendErrors.username}</div>
                    )}

                    <Field type="email" name="email" placeholder="email" />
                    <ErrorMessage name="email" component="div" className="error" />
                    {backendErrors.email && (
                    <div className="error">{backendErrors.email}</div>
                    )}

                    <Field type="password" name="password" placeholder="password" />
                    <ErrorMessage name="password" component="div" className="error" />
                    {backendErrors.password && (
                    <div className="error">{backendErrors.password}</div>
                    )}

                    <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    />
                    <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                    />

                    {backendErrors.general && (
                    <div className="error">{backendErrors.general}</div>
                    )}

                    <button type="submit">Sign up</button>
                </Form>
                )}
            </Formik>

            <p>
                Already a member? <Link to="/login">login</Link>
            </p>
            </section>
        </main>
        </div>
    );
    }

    export default SignUp;


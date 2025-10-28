    import React, { useState } from "react";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import { useNavigate, Link } from "react-router-dom";

    const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    });

    function Login() {
    const navigate = useNavigate();
    const [backendError, setBackendError] = useState("");

    const handleSubmit = async (values, { resetForm }) => {
        setBackendError("");
        try {
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            email: values.email,
            password: values.password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setBackendError(data.error || "Login failed");
            return;
        }

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        resetForm();
        navigate("/landing");
        } catch (error) {
        console.error("Error:", error);
        setBackendError("Login failed. Try again.");
        }
    };

    return (
        <main>
        <section className="login-section">
            <div className="login-content">
            <div className="login-text">
                <h1>LOGIN</h1>
            </div>

            <div className="login-form-container">
                <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
                >
                {() => (
                    <Form className="login-form">
                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" className="error" />

                    <Field type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" className="error" />

                    {backendError && <div className="error">{backendError}</div>}

                    <button type="submit">Login</button>
                    </Form>
                )}
                </Formik>

                <p>
                Don’t have an account? <Link to="/signup">sign up</Link>
                </p>
            </div>
            </div>
        </section>
        </main>
    );
    }

    export default Login;

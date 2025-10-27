    import React from "react";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import { Link } from "react-router-dom";

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
    const handleSubmit = async (values, { resetForm }) => {
        try {
        const response = await fetch("http://127.0.0.1:5000/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const data = await response.json();
        console.log("User created:", data);
        alert("Signup successful! You can now log in.");

        resetForm();
        } catch (error) {
        console.error(error);
        alert("Signup failed");
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

                    <Field type="email" name="email" placeholder="email" />
                    <ErrorMessage name="email" component="div" className="error" />

                    <Field type="password" name="password" placeholder="password" />
                    <ErrorMessage name="password" component="div" className="error" />

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

    import React from "react";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import { Link } from "react-router-dom";

    const LoginSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    });

    function LogIn() {
    const handleSubmit = (values, { resetForm }) => {
        console.log("Login form submitted:", values);
        resetForm();
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
                    initialValues={{ name: "", email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                    <Form className="login-form">
                        <Field 
                        type="text"
                        name="name"
                        placeholder="name"
                        />
                        <ErrorMessage name="name" component="div" className="error" />  

                        <Field
                        type="email"
                        name="email"
                        placeholder="email"
                        />
                        <ErrorMessage name="email" component="div" className="error" />

                        <Field
                        type="password"
                        name="password"
                        placeholder="password"
                        />
                        <ErrorMessage name="password" component="div" className="error" />

                        <button type="submit">login</button>
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

    export default LogIn;



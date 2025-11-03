    import { useState, useEffect } from "react";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import axios from "axios";

    export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const BASE_URL = "https://make-your-portfolio.onrender.com"; // ✅ Updated to match login API

    useEffect(() => {
        if (userId && token) {
        axios
            .get(`${BASE_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }, // ✅ Added JWT token
            })
            .then((res) => {
            console.log("✅ User data loaded:", res.data);
            setUser(res.data);
            })
            .catch((err) => {
            console.error("❌ Error fetching user:", err);
            alert("Failed to load profile");
            setUser({}); // ✅ Stop infinite loading
            });
        } else {
        console.log("❌ No userId or token found!");
        setUser({}); // ✅ Stop infinite loading
        }
    }, [userId, token]);

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .optional(),
        confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
        ),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
        const updatedData = {
            username: values.username,
        };

        if (values.password) {
            updatedData.password = values.password;
        }

        const response = await axios.patch(
            `${BASE_URL}/users/${userId}`,
            updatedData,
            {
            headers: { Authorization: `Bearer ${token}` }, // ✅ Added JWT token
            }
        );

        // ✅ Update local state with the returned data
        setUser(response.data); // ✅ Fixed from response.data.user to response.data

        alert("Profile updated successfully!");
        resetForm({ values: { ...values, password: "", confirmPassword: "" } });
        } catch (error) {
        console.error("Error updating profile:", error);
        alert(error.response?.data?.error || "Failed to update profile");
        } finally {
        setSubmitting(false);
        }
    };

    if (!user) return <p>Loading profile...</p>;
    
    // ✅ Handle case where user object is empty (error state)
    if (Object.keys(user).length === 0) {
        return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <p className="text-center text-red-500">Please log in to view your profile.</p>
        </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

        <Formik
            initialValues={{
            username: user.username || "",
            email: user.email || "",
            password: "",
            confirmPassword: "",
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
            <Form className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <Field
                    type="text"
                    name="username"
                    className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <Field
                    type="email"
                    name="email"
                    className="mt-1 p-2 w-full border rounded-md bg-gray-100 cursor-not-allowed"
                    disabled
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <Field
                    type="password"
                    name="password"
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Leave blank to keep current password"
                />
                <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <Field
                    type="password"
                    name="confirmPassword"
                    className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                />
                </div>

                <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
    }
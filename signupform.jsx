import React, { useState } from "react";

// SignupForm component handles user signup logic and form state
const SignupForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState([]);
  // State to track if form was successfully submitted
  const [submitted, setSubmitted] = useState(false);

  // Handles input changes and updates form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Spread operator ensures only the changed field is updated
    let updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
  };

  // Validates form fields and returns an array of error messages
  const validateForm = () => {
    const errorList = [];

    if (!formData.username) {
      errorList.push("Username is required");
    }

    // Basic email validation; could be improved with regex
    if (!formData.email.includes("@")) {
      errorList.push("Valid email is required");
    }

    // Password length check
    if (formData.password.length < 6) {
      errorList.push("Password must be at least 6 characters");
    }

    return errorList;
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
    } else {
      setErrors([]);
      setSubmitted(true);
      // In production, replace with API call
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        /><br />

        {/* Email input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br />

        {/* Password input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        /><br />

        <button type="submit">Sign Up</button>
      </form>

      {/* Display validation errors */}
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li> 
          ))}
        </ul>
      )}

      {/* Show success message on successful submission */}
      {submitted && <p style={{ color: "green" }}>Signup successful!</p>}
    </div>
  );
};

export default SignupForm;
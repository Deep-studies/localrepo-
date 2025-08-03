import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Using let here (could be const too depending on use)
    let updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
  };

  const validateForm = () => {
    const errorList = [];

    if (!formData.username) {
      errorList.push("Username is required");
    }

    if (!formData.email.includes("@")) {
      errorList.push("Valid email is required");
    }

    if (formData.password.length < 6) {
      errorList.push("Password must be at least 6 characters");
    }

    return errorList;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
    } else {
      setErrors([]);
      setSubmitted(true);
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        /><br />

        <button type="submit">Sign Up</button>
      </form>

      {/* Show errors if any */}
      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li> // <-- Loop using map
          ))}
        </ul>
      )}

      {submitted && <p style={{ color: "green" }}>Signup successful!</p>}
    </div>
  );
};

export default SignupForm;
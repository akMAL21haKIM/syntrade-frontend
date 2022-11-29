// Check whether email is valid or not
const isEmailValid = (emailToValidate) => {
  // Check if email is empty or not
  if (!emailToValidate) {
    console.log("Error: Email cannot be empty");
    return false;
  }

  // Check if email contains any whitespace or not
  if (/\s/.test(emailToValidate)) {
    console.log("Error: Email cannot contain spaces");
    return false;
  }

  // Check if email is in correct format or not
  if (!/\S+@\S+\.\S+/.test(emailToValidate)) {
    console.log("Error: Invalid email format");
    return false;
  }
  return true;
};

// Check whether password is valid or not
const isPasswordValid = (passwordToValidate) => {
  // Password must be between 8-12 characters
  // Password must have at least:
  // 1 capital letter, 1 lowercase letter, 1 digit and 1 special characters (~`!@#$%^&*()_-+={[}]|\:;"'<,>.?/)
  var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );

  // Check if password is empty or not
  if (!passwordToValidate) {
    console.log("Error: Password cannot be empty");
    return false;
  }

  // Check if length of password is between 8-12 characters or not
  if (passwordToValidate.length < 8 || passwordToValidate.length > 12) {
    console.log("Error: Password must be between 8-12 characters");
    return false;
  }

  // Check if password contains any whitespace or not
  if (/\s/.test(passwordToValidate)) {
    console.log("Error: Password cannot contain spaces");
    return false;
  }

  // Check if password have at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character
  if (!pattern.test(passwordToValidate)) {
    console.log(
      "Error: Password must have at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character"
    );
    return false;
  }

  return true;
};

// Check whether password and confirm password matches or not
const doesPasswordsMatch = (passwordToValidate, confirmPasswordToValidate) => {
  // Check if password matches confirmPassword or not
  if (passwordToValidate !== confirmPasswordToValidate) {
    console.log("Error: Password and Confirm Password does not match");
    setShowConfirmPasswordError(true);
    return false;
  }
  return true;
};

module.exports = { isEmailValid, isPasswordValid, doesPasswordsMatch };

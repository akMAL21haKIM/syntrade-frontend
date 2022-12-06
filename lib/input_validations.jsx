// Check whether email is valid or not
export const isEmailValid = (emailToValidate) => {
  // Check if email is empty or not
  if (!emailToValidate) {
    return false;
  }

  // Check if email contains any whitespace or not
  if (/\s/.test(emailToValidate)) {
    return false;
  }

  // Check if email is in correct format or not
  if (!/\S+@\S+\.\S+/.test(emailToValidate)) {
    return false;
  }
  return true;
};

// Check whether password is valid or not
export const isPasswordValid = (passwordToValidate) => {
  // Password must be between 8-12 characters
  // Password must have at least:
  // 1 capital letter, 1 lowercase letter, 1 digit and 1 special characters (~`!@#$%^&*()_-+={[}]|\:;"'<,>.?/)
  var pattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );

  // Check if password is empty or not
  if (!passwordToValidate) {
    return false;
  }

  // Check if length of password is between 8-12 characters or not
  if (passwordToValidate.length <= 7 || passwordToValidate.length >= 13) {
    return false;
  }

  // Check if password contains any whitespace or not
  if (/\s/.test(passwordToValidate)) {
    return false;
  }

  // Check if password have at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character
  if (!pattern.test(passwordToValidate)) {
    return false;
  }

  return true;
};

// Check whether password and confirm password matches or not
export const doesPasswordsMatch = (
  passwordToValidate,
  confirmPasswordToValidate
) => {
  if (passwordToValidate !== confirmPasswordToValidate) {
    return false;
  }
  return true;
};

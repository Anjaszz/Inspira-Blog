

const initialFormError = { name: "", email: "", password: "", confirmPassword: "" };

export const formValidator = (formData) => {
  let errors = { ...initialFormError };
  let isValid = true;

  if (!formData.name.trim()) {
    errors.name = "Nama harus di isi";
    isValid = false;
  }else if(formData.name.length < 3){
    errors.name = "Nama kurang dari 3 karakter ";
    isValid = false;
  }

  if (!formData.email.trim()) {
    errors.email = "Email harus di isi";
    isValid = false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = "Invalid email address";
    isValid = false;
  }

  if (!formData.password) {
    errors.password = "Password harus di isi";
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = "Password harus lebih dari 6 karakter";
    isValid = false;
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm Password harus di isi";
    isValid = false;
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords tidak sama";
    isValid = false;
  }

  return { errors, isValid };
};

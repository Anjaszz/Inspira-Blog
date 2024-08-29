

const initialFormError = { email: "", password: "" };

export const LoginValidator = (formData) => {
  let errors = { ...initialFormError };
  let isValid = true;


  if (!formData.email.trim()) {
    errors.email = "Email harus di isi";
    isValid = false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = "Format email salah";
    isValid = false;
  }

  if (!formData.password) {
    errors.password = "Password harus di isi";
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = "Password harus lebih dari 6 karakter";
    isValid = false;
  }


  return { errors, isValid };
};

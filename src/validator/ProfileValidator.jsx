

const initialFormError = { name: "", email: ""};

export const ProfileValidator = (formData) => {
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



  return { errors, isValid };
};

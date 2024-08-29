

const initialFormError = { title: ""};

export const AddCatValidator = (formData) => {
  let errors = { ...initialFormError };
  let isValid = true;


  if (!formData.title.trim()) {
    errors.title = "Title harus di isi";
    isValid = false;
   }


  return { errors, isValid };
};

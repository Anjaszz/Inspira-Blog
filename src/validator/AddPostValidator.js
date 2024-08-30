export const AddPostValidator = (formData) => {
  let errors = { 
    title: "",
    category: ""
  };
  let isValid = true;


  if (!formData.title) {
    errors.title = "Title harus di isi";
    isValid = false;
   }

   if (!formData.category) {
    errors.category = "category harus di isi";
    isValid = false;
   }

  return { errors, isValid };
};

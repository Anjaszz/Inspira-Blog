export const AddPostValidator = (formData) => {
  let errors = { 
    title: "",
    category: ""
  };
  let isValid = true;


  if (!formData.title) {
    errors.title = "Title harus di isi";
    isValid = false;
   }else if(formData.title.length < 3){
    errors.title = "Title terlalu pendek";
    isValid = false;
   }

   if (!formData.category) {
    errors.category = "category harus di isi";
    isValid = false;
   }

  return { errors, isValid };
};

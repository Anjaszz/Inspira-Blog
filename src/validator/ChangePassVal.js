

const initialFormError = { oldPassword: "", newPassword:""};

export const ChangePass = (formData) => {
  let errors = { ...initialFormError };
  let isValid = true;


  if (!formData.oldPassword.trim()) {
    errors.oldPassword = "Password lama harus di isi";
    isValid = false;
   }

   if (!formData.newPassword.trim()) {
    errors.newPassword = "Password baru harus di isi";
    isValid = false;
   } else if(formData.newPassword.length < 6 ){
    errors.newPassword = "Password baru terlalu pendek";
    isValid = false;
   }

   if(formData.oldPassword && formData.oldPassword === formData.newPassword){
    errors.newPassword = "Password baru sama dengan yang lama";
    isValid = false;
   }


  return { errors, isValid };
};

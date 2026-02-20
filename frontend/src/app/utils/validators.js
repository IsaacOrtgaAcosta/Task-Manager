  // Function that valiates if the email is synthactically correct
  export const emailValidation = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  export const passwordValiadtion = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,12}$/;
    return regex.test(password);
  }
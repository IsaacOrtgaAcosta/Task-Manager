// Function that valiates if the email is synthactically correct
export const emailValidation = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const passwordValidation = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,12}$/;
  return regex.test(password);
};

export const passwordsMatch = (password, secondPassword) => {
  console.log('entra aquí: ', password, secondPassword)
  if (password === secondPassword) {
    return true;
  } else {
    return false;
  }
};
